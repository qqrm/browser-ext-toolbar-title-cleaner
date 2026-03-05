# Toolbar Title Cleaner

Firefox WebExtension that clears the title **only for newly created** bookmarks
placed **directly** on the Bookmarks Toolbar (not inside folders). Existing bookmarks
and manual renames are not touched.

## Dev install (temporary)
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on...**
3. Select `manifest.json` from this repo

## Package (XPI)
Zip the contents of this repo (manifest.json + background.js) into a zip and rename to `.xpi`.
Then install via `about:addons` -> gear -> **Install Add-on From File...**

## Behavior rules
- Cleans title only on `bookmarks.onCreated`.
- Only if `parentId === "toolbar_____"` and `type === "bookmark"`.
- Does not listen to `onChanged`/`onMoved`.
