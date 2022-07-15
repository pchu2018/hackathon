// THIS FILE CONTROLS THE BEHAVIOR OF THE EXTENSION USER INTERFACE
// -> button clicks will activate the chosen study buddy

// initialize button to select animal-buddy
chrome.storage.sync.get("buddy", ({ buddy }) => {
  let button = document.querySelector('#' + buddy);
  button.style.backgroundColor = 'pink';
})

// create new animal buddy class