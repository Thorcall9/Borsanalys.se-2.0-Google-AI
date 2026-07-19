import assert from "node:assert/strict";
import test from "node:test";
import { normalizeProfileInput } from "../profile.ts";

test("trims editable profile fields before saving", () => {
  assert.deepEqual(normalizeProfileInput({ displayName: "  Ada Lovelace  ", photoURL: " https://example.com/ada.jpg " }), {
    displayName: "Ada Lovelace",
    photoURL: "https://example.com/ada.jpg",
  });
});

test("rejects an empty display name", () => {
  assert.throws(() => normalizeProfileInput({ displayName: " ", photoURL: "" }), /Ange ett namn/);
});

test("rejects a profile image that is not an http(s) URL", () => {
  assert.throws(() => normalizeProfileInput({ displayName: "Ada", photoURL: "javascript:alert(1)" }), /http/);
});
