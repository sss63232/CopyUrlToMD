import { TARGET_TAB_TYPE, TARGET_CONTENT_TYPE } from '../constants/tab'
import { getTabLink } from './markdownUtils'
import { getTabsByQuerying } from './browserTabsUtils'
import copy from 'copy-to-clipboard'
import _ from 'lodash'

export const getTabLinkOption = targetContentType => {
  let option = {}
  switch (targetContentType) {
    case TARGET_CONTENT_TYPE.ONLY_URL: {
      option = { hasTitle: false }
      break
    }
    case TARGET_CONTENT_TYPE.ONLY_TITLE: {
      option = { hasUrl: false }
      break
    }
    default:
    case TARGET_CONTENT_TYPE.BOTH_TITLE_URL: {
      break
    }
  }

  return option
}

export const copyHandler = async target => {
  const {
    targetTabType = TARGET_TAB_TYPE.ONLY_CURRENT_TAB,
    targetContentType = TARGET_CONTENT_TYPE.BOTH_TITLE_URL
  } = target

  const mdLinkOption = getTabLinkOption(targetContentType)

  const getJoinedTextByTabs = tabs => {
    if (tabs.length > 1) {
      const getTextByTab = tab => getTabLink(tab, mdLinkOption)
      return tabs.map(getTextByTab).join(' ')
    } else {
      return getTabLink(_.head(tabs), {
        ...mdLinkOption,
        unorderedList: false
      })
    }
  }

  let selectedTabs = []
  try {
    switch (targetTabType) {
      case TARGET_TAB_TYPE.ALL_TABS: {
        selectedTabs = await getTabsByQuerying({
          currentWindow: true
        })
        break
      }
      case TARGET_TAB_TYPE.HIGHLIGHTED_TABS: {
        selectedTabs = await getTabsByQuerying({
          highlighted: true,
          currentWindow: true
        })
        break
      }
      default:
      case TARGET_TAB_TYPE.ONLY_CURRENT_TAB: {
        selectedTabs = await getTabsByQuerying({
          active: true,
          currentWindow: true
        })
        break
      }
    }

    const text = getJoinedTextByTabs(selectedTabs)
    const hasCopiedSuccessfully = copy(text)
    return {
      hasCopiedSuccessfully,
      copiedText: text
    }
  } catch (error) {

  }
}
