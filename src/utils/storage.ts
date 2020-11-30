export function getStorageItem(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch (err) {
    console.error(err);
  }
  return null;
}

export function setStorageItem(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    console.error(err);
  }
}
