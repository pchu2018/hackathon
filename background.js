// THIS FILE RUNS FIRST WHEN THE EXTENSION IS INSTALLED/STARTED
// -> sets the initial buddy to default to animal

let buddy = 'animal-buddy';

chrome.runtime.onInstalled.addListener( () => {
  // what do we want it to do when it is installed?
  console.log('hellow there')
  // default button is animal
  chrome.storage.sync.set({ buddy })
})