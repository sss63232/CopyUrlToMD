import React from 'react'
import ReactMarkdown from 'react-markdown'

const renderMarkdown = (mdString = '') => <ReactMarkdown source={mdString} />

const Success = props => {
  const { copiedLink } = props

  const mdFormattedLink = renderMarkdown(copiedLink)

  return (
    <div>
      <h1>copied success!</h1>
      <h2>in clipboard:</h2>
      <span>{copiedLink}</span>
      <h2>will be rendered as </h2>

      {mdFormattedLink}
    </div>
  )
}

export default Success
