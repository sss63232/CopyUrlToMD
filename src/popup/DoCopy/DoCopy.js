import React, { useState, useEffect } from 'react'

import { copyHandler } from '../../background/copyHandler'
import { Row, Button } from 'antd'
import { PAGE_MODE } from '../../constants/page'
import Success from '../Success/Success'
import useGetSyncTarget from '../../Hooks/useGetSyncTarget'

const DoCopy = props => {
  const {
    setPageMode
  } = props

  const [hasCopied, setHasCopied] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState('')

  const target = useGetSyncTarget({ highlightedTabsFirst: true })

  useEffect(
    () => {
      setHasCopied(false)
      setCopiedUrl('')

      const copyTarget = async () => {
        try {
          const {
            copiedText,
            hasCopiedSuccessfully
          } = await copyHandler(target)

          setHasCopied(hasCopiedSuccessfully)
          setCopiedUrl(copiedText)
        } catch (error) {

        }
      }

      copyTarget()
    },
    [target]
  )

  return (
    <>
      <Row
        type='flex'
        justify='end'
      >
        <Button
          shape='circle'
          icon='setting'
          style={{
            margin: 15
          }}
          onClick={() => {
            setPageMode(PAGE_MODE.SETTINGS)
          }}
        />
      </Row>
      <div
        style={{
          background: '#fff',
          padding: 25
        }}
      >
        {
          hasCopied
            ? (
              (
                <Success
                  target={target}
                  copiedLink={copiedUrl}
                />
              )
            )
            : (
              <h3>loading</h3>
            )
        }
      </div>
    </>
  )
}

export default DoCopy
