// THIS FILE RUNS FIRST WHEN THE EXTENSION IS INSTALLED/STARTED
// -> store initial information about the button states

chrome.runtime.onInstalled.addListener( () => {
  // what do we want it to do when it is installed?
  console.log('hellow there')
  // clear storage
  // chrome.storage.sync.set({ 'current' : 'otto' })
  chrome.storage.sync.set({ 'made' : false })
})