import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Result } from 'antd'

const renderMarkdown = (mdString = '') => <ReactMarkdown source={mdString} />

const Success = props => {
  const { copiedLink } = props

  const mdFormattedLink = renderMarkdown(copiedLink)

  return (
    <div>
      <Result
        status='success'
        title='Successfully Copied the URL'
        subTitle='The URL has also been saved to your clipboard so you could simply paste it right now.'
        extra={
          <div>
            <h2>Source code in clipboard</h2>
            <span>{copiedLink}</span>
            <h2>will be rendered as </h2>

            {mdFormattedLink}
          </div>
        }
      />
    </div>
  )
}

export default Success
