const getPluralTemplateString = (locale, c) => {
  if (c === 0 && locale.zero) return locale.zero
  if (c % 10 === 1 && c % 100 !== 11) return locale.one
  if (c % 10 >= 2 && c % 10 <= 4 && (c % 100 < 10 || c % 100 >= 20))
    return locale.few
  return locale.many
}

export const pluralize = (locale, count) =>
  getPluralTemplateString(locale, count).replace(/%{count}/g, `${count}`)
