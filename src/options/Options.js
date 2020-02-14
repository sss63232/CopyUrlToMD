import React, { Component } from 'react'
import '@polymer/paper-button/paper-button.js'

import './Options.css'
import { Radio } from 'antd'
import { syncSave } from '../browserApiHelpers/storageHelper'

export const TARGET_TAB_TYPE_KEY = 'targetTabType'

const TARGET_TAB_TYPE = [
  'onlyCurrentTab',
  'allTabs'
]

class Options extends Component {
  render () {
    return (
      <div className='App'>
        Copy:
        <Radio.Group
          defaultValue='onlyCurrentTab'
          buttonStyle='solid'
          onChange={e => {
            const targetValue = e.target.value
            syncSave({
              [TARGET_TAB_TYPE_KEY]: targetValue
            })
          }}
        >
          {
            TARGET_TAB_TYPE.map(mode => {
              return (
                <Radio.Button
                  key={`${mode}Mode`}
                  value={mode}
                >
                  {mode}
                </Radio.Button>
              )
            })
          }
        </Radio.Group>
      </div>
    )
  }
}

export default Options
