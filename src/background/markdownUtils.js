
const getTitleUrl = (tab, options) => {
  const {
    hasUrl = true,
    hasTitle = true
  } = options

  const {
    title,
    url
  } = tab

  if (hasUrl && hasTitle) {
    return `[${title}](${url})`
  }

  if (hasUrl) {
    return url
  }

  return title
}

/**
 *  get the title and url transformed into Markdown format
 *
 */
export const getTabLink = (tab, options = {}) => {
  const {
    hasUrl = true,
    hasTitle = true,
    unorderedList = true
  } = options

  const titleUrl = getTitleUrl(tab, { hasUrl, hasTitle })
  if (unorderedList) {
    return `* ${titleUrl}\n`
  }

  return `${titleUrl}\n`
}
