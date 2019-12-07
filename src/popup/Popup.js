import React, { useState, useEffect } from 'react'
import './Popup.css'
import Success from './Success/Success'
import { getMDLink } from './util'
import copy from 'copy-to-clipboard'
import { Button } from 'antd'

/* globals browser */

const getTabsBy = (queryInfo = {}) => browser.tabs.query(queryInfo)

const getCurrentActiveTabs = () => getTabsBy({
  currentWindow: true,
  active: true
})

const Popup = () => {
  const [hasCopied, setHasCopied] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState()

  useEffect(
    () => {
      getCurrentActiveTabs()
        .then(
          tabs => {
            const { title, url } = tabs[0]
            const mdLink = getMDLink(title, url)
            const copySucceed = copy(mdLink)
            if (copySucceed) {
              setHasCopied(true)
              setCopiedUrl(mdLink)
            }
          }
        )
    },
    []
  )

  return (
    <div className='popup'>
      <Button type='primary'>Primary</Button>
      {hasCopied && <Success copiedLink={copiedUrl} />}

    </div>
  )
}

export default Popup
