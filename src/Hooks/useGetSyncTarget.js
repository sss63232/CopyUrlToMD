import { useState, useEffect } from 'react'
import { getTargetFromChromeSync } from '../browserApiHelpers/storageHelper'
import {
  TARGET_TAB_TYPE,
  TARGET_CONTENT_TYPE,
  TARGET_CONTENT_TYPE_KEY,
  TARGET_TAB_TYPE_KEY
} from '../constants/tab'
import { getTabsByQuerying } from '../background/browserTabsUtils'

const DEFAULT_TARGET = {
  [TARGET_TAB_TYPE_KEY]: TARGET_TAB_TYPE.ONLY_CURRENT_TAB,
  [TARGET_CONTENT_TYPE_KEY]: TARGET_CONTENT_TYPE.BOTH_TITLE_URL
}

const useGetSyncTarget = options => {
  const {
    highlightedTabsFirst
  } = options

  const [target, setTarget] = useState(DEFAULT_TARGET)

  useEffect(
    () => {
      const initTarget = async () => {
        try {
          const savedTarget = await getTargetFromChromeSync()

          let target = savedTarget
          if (highlightedTabsFirst) {
            const highlightedTabs = await getTabsByQuerying({
              highlighted: true,
              currentWindow: true
            })

            if (highlightedTabs.length > 1) {
              target = {
                ...savedTarget,
                [TARGET_TAB_TYPE_KEY]: TARGET_TAB_TYPE.HIGHLIGHTED_TABS
              }
            }
          }

          setTarget(target)
        } catch (error) {

        }
      }

      initTarget()
    },
    []
  )

  return target
}

export default useGetSyncTarget
