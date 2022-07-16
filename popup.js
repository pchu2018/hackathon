// THIS FILE CONTROLS THE BEHAVIOR OF THE EXTENSION USER INTERFACE
// -> button clicks will activate the chosen study buddy

// store image sources by buddy name in chrome storage
chrome.storage.sync.set({
  'ottoIMG' : 'http://images.shoutwiki.com/sanrio/thumb/8/81/Pompompurin.png/200px-Pompompurin.png',
  'jujuIMG' : 'https://seeklogo.com/images/M/my_melody-logo-42B1DE4CAD-seeklogo.com.png'
})

let otto = document.querySelector('#pei-buddy');
let juju = document.querySelector('#sammie-buddy');
let getButton = document.querySelector('#GET');
// retrieve button states from storage and update buttons
chrome.storage.sync.get(['current'], function(result) {
  let currentBuddy = result.current;
  updateBuddy(currentBuddy)
})
chrome.storage.sync.get(['made'], function(result) {
  let buddyMade = result.made;
  updateGet(buddyMade)
})

// GENERATE BUTTONS BASED ON STATE
  // generate GET button
function updateGet(buddyMade) {
  if (!buddyMade) {
    getButton.innerHTML = 'GET BUDDY!'
    getButton.style.backgroundColor = 'orange';
    getButton.style.color = 'white'
  } else if (buddyMade) {
    getButton.innerHTML = 'BYE BUDDY?';
    getButton.style.backgroundColor = 'white';
    getButton.style.color = 'orange'
  }
}
// update buddy button and buddy themselves
function updateBuddy(currentBuddy) {
  if (currentBuddy == 'otto') {
    // changes button
    otto.style.backgroundColor = 'pink'
    otto.style.border = '1px solid dimgray'
    juju.style.backgroundColor = 'lightgray';
    juju.style.border = 'none'
    // changes img src
    changeBuddy('otto')
  } else if (currentBuddy == 'juju') {
    juju.style.backgroundColor = 'pink'
    juju.style.border = '1px solid dimgray'
    otto.style.backgroundColor = 'lightgray';
    otto.style.border = 'none'
    changeBuddy('juju')
  }
}


// ONCLICK BEHAVIOR

// juju button
juju.addEventListener('click',  function(event) {
  event.preventDefault()
  chrome.storage.sync.set({ 'current' : 'juju'})
  updateBuddy('juju')
})
// otto button
otto.addEventListener('click',  function(event) {
  event.preventDefault()
  chrome.storage.sync.set({ 'current' : 'otto'})
  updateBuddy('otto')
})
// GET button
getButton.addEventListener('click', function(event) {
  event.preventDefault()
  // get state from chrome storage
  chrome.storage.sync.get(['made'], function(result) {
    let buddyMade = !result.made;
    // update state in storage and change button
    chrome.storage.sync.set({ 'made' : buddyMade}, function() {
      updateGet(buddyMade)
    })
    // create or remove buddy
    if (buddyMade) {
      makeBuddy()
    } else {
      removeBuddy()
    }
  })
})



// WEBPAGE SCRIPTS

function changeBuddyHelper(buddy) {
  // get buddy element from webpage
  let buddyIMG = document.querySelector('#study-buddy-img');
  // get new img src from storage
  chrome.storage.sync.get([`${buddy}IMG`], result => {
    buddyIMG.setAttribute('src', result[`${buddy}IMG`])
    console.log(`${buddy}IMG`)
  })
}

// create new buddy when 'GET BUDDY' is clicked
function makeBuddyHelper() {

  let test = document.createElement('div')
  document.body.append(test)
  test.setAttribute('id', 'study-buddy')
  test.style.cssText = 'position: fixed; bottom: 0; margin: 10px'
  // create img inside of div
  let image = document.createElement('img')
  image.setAttribute('id', 'study-buddy-img')
  image.style.height = '200px'
  test.append(image)
  // change source depending on selected buddy
  chrome.storage.sync.get(['current'], function(result) {
    console.log('buddy here')
    if(result.current == 'otto') chrome.storage.sync.get(['ottoIMG'], result => {
      image.setAttribute('src', result.ottoIMG)
    })
    if(result.current == 'juju') chrome.storage.sync.get(['jujuIMG'], result => {
      image.setAttribute('src', result.jujuIMG)
    })
  })
}
// REMOVE BUDDY 
function removeBuddyHelper() {
  // get buddy element
  let buddy = document.querySelector('#study-buddy');
  buddy.remove();
}

async function changeBuddy (buddy) {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeBuddyHelper,
    args: [buddy]
  });
}

async function makeBuddy () {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: makeBuddyHelper,
  });
}

async function removeBuddy () {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: removeBuddyHelper,
  });
}


