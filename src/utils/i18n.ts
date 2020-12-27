export function getDefaultTimezone(): string | null {
  let defaultTimeZone: string | null = null;

  try {
    const options = new Intl.DateTimeFormat().resolvedOptions();

    if (typeof options.timeZone === 'string') {
      defaultTimeZone = options.timeZone;
    }
  } catch (intlError) {
    console.error(intlError);
  }

  return defaultTimeZone;
}
