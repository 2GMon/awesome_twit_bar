# Awesome Twit Bar

This is a Firefox add-on which allow you to operate twitter from smart location bar.
Awesome Twit Bar pays respect to [Twittperator](https://github.com/vimpr/vimperator-plugins/blob/master/twittperator.js).

## Supported versions of Firefox

* Firefox 57 and later

## Basic Usage

* authorize with add-on's preferences page.
* typing command in the smart location bar.

### Show

* `atw !` Shows your timeline.

### Tweet

* `atw hello` Tweet `hello`
* `atw !@screen_name#tweet_id hello` reply to `tweet_id` `hello`

## Development builds

with `node v8.14.0` and `yarn v1.12.3`

```
yarn install
npm run clean
npm run dev
```

## Production builds

```
yarn install
npm run clean
npm run build
```
