# GitHub Notification Fixer

For all those who hate the new GitHub Notification System with a passion.

**Warning:** this readme contains rage and swear words, process with caution

## Requirements

Something which can inject custom JavaScript and CSS into web pages.

## What does it do?

- Tidy up layout and remove useless UI clutter
- Replace the new "DONE" nonsense with the good old "Mark as read" (**intercepts requests to the API**)
- Removes bookmarks button
- Adds link to repository in grouped by repository mode header (the old layout had those by default)
- Removes tracking links from notifications so you don't get this new shitty header when visiting an issue/pr etc.

## Troubleshooting

**Help, I still get this shitty header when clicking on notification links!!**

Add this CSS to all GitHub pages:

```css
/* fucking remove this new notification navigation cancer when visiting page from a notification */
.notifications-v2.notification-shelf.js-notification-shelf.js-notification-top-shelf,
.js-sticky.js-sticky-offset-scroll.top-0.gh-header-sticky.is-stuck,
.gh-header-shadow.box-shadow.js-notification-shelf-offset-top {
    display: none !important;
}
.js-sticky.js-sticky-offset-scroll.top-0 {
    top: 0 !important;
}
```

## License

Do what ever the fuck you want with it. I implemented this on an evening while raging and being very pissed of :angry:
