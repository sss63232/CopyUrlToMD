/* globals browser */

const getTabsBy = async (queryInfo = {}) => {
  try {
    const tabs = await browser.tabs.query(queryInfo)
    return tabs
  } catch (error) {

  }
}

export const getCurrentActiveTabs = async () => {
  const currentActiveTabs = await getTabsBy({
    currentWindow: true,
    active: true
  })

  return currentActiveTabs
}
