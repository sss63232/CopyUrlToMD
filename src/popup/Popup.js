import React, { useState, useEffect } from 'react'
import styles from './Popup.module.css'
import Success from './Success/Success'
import { getMDLink } from './util'
import copy from 'copy-to-clipboard'
import { getCurrentActiveTabs } from '../background/browserTabsUtils'
import { syncGet } from '../browserApiHelpers/storageHelper'
import { TARGET_TAB_TYPE_KEY } from '../options/Options'

const Popup = () => {
  const [hasCopied, setHasCopied] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState()

  useEffect(
    async () => {
      const tabs = await getCurrentActiveTabs()
      const { title, url } = tabs[0]
      syncGet([TARGET_TAB_TYPE_KEY]).then(result => {
      })
      const mdLink = getMDLink(title, url)
      const copySucceed = copy(mdLink)
      if (copySucceed) {
        setHasCopied(true)
        setCopiedUrl(mdLink)
      }
    },
    []
  )

  return (
    <div className={styles.popup}>
      {hasCopied && <Success copiedLink={copiedUrl} />}
    </div>
  )
}

export default Popup
