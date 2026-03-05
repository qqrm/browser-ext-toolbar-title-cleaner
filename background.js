"use strict";

// Firefox bookmarks toolbar root id (WebExtension Bookmarks API).
const TOOLBAR_ID = "toolbar_____";

// Only process *newly created* bookmarks that are created directly on the toolbar root.
// Do NOT react to rename/move events, and do NOT scan existing bookmarks.
function shouldCleanNew(node) {
  return (
    node &&
    node.type === "bookmark" &&
    node.parentId === TOOLBAR_ID &&
    typeof node.url === "string" &&
    node.url.length > 0
  );
}

// Prevent self-trigger recursion on onCreated (shouldn't normally happen, but safe).
const selfUpdates = new Set();

async function clearTitle(id) {
  if (selfUpdates.has(id)) return;

  const nodes = await browser.bookmarks.get(id).catch(() => []);
  const node = nodes && nodes[0];
  if (!shouldCleanNew(node)) return;
  if (node.title === "") return;

  selfUpdates.add(id);
  try {
    await browser.bookmarks.update(id, { title: "" });
  } catch (_) {
    // ignore
  } finally {
    setTimeout(() => selfUpdates.delete(id), 0);
  }
}

browser.bookmarks.onCreated.addListener((id, node) => {
  if (shouldCleanNew(node)) {
    clearTitle(id);
  }
});
