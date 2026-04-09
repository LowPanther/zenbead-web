/**
 * Line breaks and pasted HTML → plain text for web journal saves.
 * Keeps parity with iOS `WebJournalParagraphFormatting` where tags become newlines.
 */

/** CRLF, CR, Unicode line/paragraph separators; NBSP → space. Internal `\n` preserved. */
export function normalizeReflectionLineEndings(s: string): string {
  return s
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .replace(/\u2028/g, "\n")
    .replace(/\u2029/g, "\n\n")
    .replace(/\u00a0/g, " ");
}

/** Trim outer whitespace only (same intent as `text.trim()` for save). */
export function normalizeReflectionTextForSave(raw: string): string {
  return normalizeReflectionLineEndings(raw).trim();
}

export function looksLikeHtmlFragment(s: string): boolean {
  return s.includes("<") && /<[a-zA-Z!?]/.test(s);
}

/**
 * Clipboard HTML → plain text with paragraph/line breaks, then strip tags.
 * Used on paste so sources like Docs/Notion/email don’t become one line in Firestore.
 */
export function plainTextFromHtml(html: string): string {
  let s = normalizeReflectionLineEndings(html);
  s = s.replace(/<br\s*\/?>/gi, "\n");

  const blockClose = [
    "</p>",
    "</div>",
    "</section>",
    "</article>",
    "</li>",
    "</h1>",
    "</h2>",
    "</h3>",
  ];
  for (const tag of blockClose) {
    s = s.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "\n\n");
  }

  for (const tag of ["<figure>", "<blockquote>"]) {
    s = s.replace(new RegExp(tag.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi"), "\n\n");
  }

  const blockOpenStrip = [
    "<p",
    "<div",
    "<section",
    "<article",
    "<li",
    "<h1",
    "<h2",
    "<h3",
  ];
  for (const prefix of blockOpenStrip) {
    s = s.replace(new RegExp(`${prefix}[^>]*>`, "gi"), "");
  }

  s = s.replace(/<[^>]+>/g, "");
  s = decodeBasicHtmlEntities(s);
  return normalizeReflectionLineEndings(s);
}

function decodeBasicHtmlEntities(s: string): string {
  return s
    .replace(/&nbsp;/g, " ")
    .replace(/&#10;/g, "\n")
    .replace(/&#13;/g, "\n")
    .replace(/&#160;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, "&");
}
