const DEFAULT_OPTIONS = {
  escape: false
}

export async function syncSave (storingData) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(storingData, resolve)
  })
}

export async function syncGet (keys) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, resolve)
  })
}

export function onChange (callback) {
  chrome.storage.onChanged.addListener((changes) => {
    const callbackChanges = {}

    Object.keys(DEFAULT_OPTIONS).forEach((key) => {
      callbackChanges[key] = changes[key].newValue
    })

    callback(callbackChanges)
  })
}
