export interface ProfileInput {
  displayName: string;
  photoURL: string;
}

export function normalizeProfileInput(input: ProfileInput): ProfileInput {
  const displayName = input.displayName.trim();
  const photoURL = input.photoURL.trim();

  if (!displayName) throw new Error("Ange ett namn.");
  if (displayName.length > 80) throw new Error("Namnet får vara högst 80 tecken.");
  if (photoURL && !/^https?:\/\//i.test(photoURL)) throw new Error("Profilbildens adress måste börja med http:// eller https://.");

  return { displayName, photoURL };
}
