// THIS FILE CONTROLS THE BEHAVIOR OF THE EXTENSION USER INTERFACE
// -> button clicks will activate the chosen study buddy

// store image sources by buddy name in chrome storage
chrome.storage.sync.set({
  'ottoIMG' : {
    'greeting' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/ottoAvatar.png',
    'one' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/gimmeDaBacon_otto.png',
    'two' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/it\'sHardIKnow_otto.png',
    'three' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/rubOn_otto.png',
  },
  'jujuIMG' : {
    'greeting' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/jujuAvatar.png',
    'one' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/laser-focused_juju.png',
    'two' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/takeALunchBreak_juju.png',
    'three' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/thinkOutsideTheBox_juju.png'
  },
  'text-animations' : {
    'greeting' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/testingGift.gif',
    'ottoone' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/gimmeDaBacon_otto.gif',
    'jujuone' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/laser-focused_juju.gif',
    'ottotwo' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/it\'sHardIKnow_otto.gif',
    'jujutwo' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/takeALunchBreak_juju.gif',
    'jujuthree' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/thinkOutsideTheBox_juju.gif',
    'ottothree' : 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/gif/rubOn!_Otto.gif'
  }
    

})

let otto = document.querySelector('#pei-buddy');
let juju = document.querySelector('#sammie-buddy');
let getButton = document.querySelector('#GET');
let onebutton = document.querySelector('#one');
let twobutton = document.querySelector('#two');
let threebutton = document.querySelector('#three');
// retrieve button states from storage and update buttons
chrome.storage.sync.get(['current', 'version'], function(result) {
  let currentBuddy = result.current;
  updateBuddy(currentBuddy, result.version)
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
function updateBuddy(currentBuddy, version) {
  if (currentBuddy == 'otto') {
    // changes button
    otto.style.backgroundColor = 'pink'
    otto.style.border = '1px solid dimgray'
    juju.style.backgroundColor = 'lightgray';
    juju.style.border = 'none'
    // changes img src
    changeBuddy('otto', version)
  } else if (currentBuddy == 'juju') {
    juju.style.backgroundColor = 'pink'
    juju.style.border = '1px solid dimgray'
    otto.style.backgroundColor = 'lightgray';
    otto.style.border = 'none'
    changeBuddy('juju', version)
  }
}


// ONCLICK BEHAVIOR

// juju button
juju.addEventListener('click',  function(event) {
  event.preventDefault()
  chrome.storage.sync.set({ 'current' : 'juju'})
  chrome.storage.sync.get(['version'], function(result) {
    updateBuddy('juju', result.version)
  })
  
})
// otto button
otto.addEventListener('click',  function(event) {
  event.preventDefault()
  chrome.storage.sync.set({ 'current' : 'otto'})
  chrome.storage.sync.get(['version'], function(result) {
    updateBuddy('otto', result.version)
  })
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
// version buttons
onebutton.addEventListener('click', function(event) {
  event.preventDefault()
  // retrieve buddy info and text from storage
  chrome.storage.sync.get(['current', 'text-animations'], function(result) {
    // change to correct buddy version
    // change text
    changeBuddy(result.current, 'one')
    chrome.storage.sync.set({ 'version' : 'one'})
  })
})
twobutton.addEventListener('click', function(event) {
  event.preventDefault()
  // retrieve buddy info and text from storage
  chrome.storage.sync.get(['current', 'text-animations'], function(result) {
    // change to correct buddy version
    // change text
    changeBuddy(result.current, 'two')
    chrome.storage.sync.set({ 'version' : 'two'})
  })
})
threebutton.addEventListener('click', function(event) {
  event.preventDefault()
  // retrieve buddy info and text from storage
  chrome.storage.sync.get(['current', 'text-animations'], function(result) {
    // change to correct buddy version
    // change text
    changeBuddy(result.current, 'three')
    chrome.storage.sync.set({ 'version' : 'three'})
  })
})

// WEBPAGE SCRIPTS

function changeBuddyHelper(buddy, version) {
  // get buddy element from webpage
  let buddyIMG = document.querySelector('#study-buddy-img');
  let text = document.querySelector('#buddy-speech-bubble')
  // get new img and text src from storage
  chrome.storage.sync.get([`${buddy}IMG`, 'text-animations'], result => {
    buddyIMG.setAttribute('src', result[`${buddy}IMG`][version])
    // set text to greeting or buddy version
    if (version == 'greeting') text.setAttribute('src', result['text-animations'].greeting)
    else text.setAttribute('src', result['text-animations'][`${buddy}${version}`])
  })
}

// create new buddy when 'GET BUDDY' is clicked
function makeBuddyHelper() {
  // create img container
  let test = document.createElement('div')
  document.body.append(test)
  test.setAttribute('id', 'study-buddy')
  test.style.cssText = 'position: fixed; bottom: 0; margin: 10px'
  // create textbox
  let speech = document.createElement('img')
  test.append(speech)
  speech.setAttribute('id', 'buddy-speech-bubble')
  speech.setAttribute('src', 'https://raw.githubusercontent.com/pchu2018/hackathon/main/images/testingGift.gif')
  speech.style.cssText = 'width: 200px; position: absolute; margin-left: 160px;'
  // create img inside of div
  let image = document.createElement('img')
  image.setAttribute('id', 'study-buddy-img')
  image.style.height = '200px'
  test.append(image)
  // change source depending on selected buddy
  chrome.storage.sync.get(['current', 'version'], function(result) {
    console.log('buddy here')
    if(result.current == 'otto') chrome.storage.sync.get(['ottoIMG'], result => {
      image.setAttribute('src', result.ottoIMG.greeting)
    })
    if(result.current == 'juju') chrome.storage.sync.get(['jujuIMG'], result => {
      image.setAttribute('src', result.jujuIMG.greeting)
    })
  })
  // store timestamp
  chrome.storage.sync.set({ 'time-started' : new Date()})
}
// REMOVE BUDDY 
function removeBuddyHelper() {
  // get buddy element
  let buddy = document.querySelector('#study-buddy');
  buddy.remove();
}

// // UPDATE PICTURE AND SPEECH BUBBLE
// function versionHelper (buddy) {
//   // get buddy img
//   let buddyIMG = document.querySelector('#study-buddy-img')
//   // get speech bubble
//   let speech = document.querySelector('#buddy-speech-bubble');
//   // retrieve version from storage and update
// }

// retrieve time
function timerHelper () {

}

async function changeBuddy (buddy, version) {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: changeBuddyHelper,
    args: [buddy, version]
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

async function versionBuddy (buddy) {
  let [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: versionHelper,
    args: [buddy]
  });
}

