// ==UserScript==
// @name         GitHub Notification Fixer
// @namespace    http://javascript.about.com
// @version      0.1
// @include      https://github.com/notifications*
// @grant        none
// @run-at       document-start
// ==/UserScript==

// replaces the DONE action with a MARK AS READ action
function gh_replaceDoneWithMarkAsRead()
{
    console.log("Replacing single...");
    let elements = document.querySelectorAll('form[data-status="archived"][action="/notifications/beta/archive"]');
    //console.log("Found elements:", elements);
    elements.forEach((element) => {
        element.setAttribute("data-status", "read");
        element.setAttribute("action", "/notifications/beta/mark");

        // replace auth token to make the mark as read request work (every form has its own dedicated auth token)
        let token = document.querySelector('.js-notifications-mark-selected-actions details-menu form[data-status="read"] input').value;
        element.querySelector('input[name="authenticity_token"').value = token;

        element.querySelectorAll("button").forEach((btn) => {
            btn.setAttribute("title", "Mark as read");
            btn.setAttribute("style", "color: red"); // verify the action was replaced
        });
    });
}

function gh_replaceGroupDoneWithMarkAsRead()
{
    console.log("Replacing groups...");
    let elements = document.querySelectorAll('.js-grouped-notifications-mark-all-read-button[action="/notifications/beta/archive"]');
    //console.log("Found elements:", elements);
    elements.forEach((element) => {
        element.setAttribute("action", "/notifications/beta/mark");

        // replace auth token to make the mark as read request work (every form has its own dedicated auth token)
        let token = document.querySelector('.js-notifications-mark-selected-actions details-menu form[data-status="read"] input').value;
        element.querySelector('input[name="authenticity_token"').value = token;

        element.querySelectorAll("button").forEach((btn) => {
            //btn.setAttribute("title", "Mark all as read");
            btn.setAttribute("style", "color: red"); // verify the action was replaced
        });
    });
}

function gh_removeNotificationTrackingLinks()
{
    console.log("Removing tracking links...");
    let links = document.querySelectorAll(".Box-body a.js-navigation-open.notification-list-item-link");
    links.forEach((link) => {
        let href = link.getAttribute("href");
        let queryPos = href.indexOf("?");
        if (queryPos === -1)
        {
            return;
        }
        link.setAttribute("href", href.substring(0, queryPos));
    });
}

function gh_addRepoLinkToGroup()
{
    console.log("Adding repository link to headers...");
    let elements = document.querySelectorAll(".Box-header h6");
    elements.forEach((element) => {
        let text = element.innerHTML.trim();
        element.outerHTML = '<a style="color: black; width: 100%; font-weight: bold" href="/' + text + '">' + text + '</a>';
    });
}

function gh_script_eventloop() {
    setTimeout(function () {
        gh_replaceDoneWithMarkAsRead();
        gh_replaceGroupDoneWithMarkAsRead();
        gh_addRepoLinkToGroup();
        gh_removeNotificationTrackingLinks();

        gh_script_eventloop();
    }, 10000);
}

// start script
gh_replaceDoneWithMarkAsRead();
gh_replaceGroupDoneWithMarkAsRead();
gh_addRepoLinkToGroup();
gh_removeNotificationTrackingLinks();

gh_script_eventloop();
