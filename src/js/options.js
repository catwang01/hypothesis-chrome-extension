import "../css/options.css";

const syncBox = (boxId) => {
  const checkbox = document.getElementById(boxId) 
  const prop = checkbox.name;

  console.log(prop)
  chrome.storage.sync.get(prop, (data) => {
    checkbox.checked = data[prop]
  })

  checkbox.onclick = function (e) {
    chrome.storage.sync.set({[prop]: checkbox.checked}, function() {
      console.log(boxId + ' changed to ' + checkbox.checked);
    })
  }
}

const syncInput = (inputId, buttonId) => {
  
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);
  const prop = input.name;
  console.log(prop)
  chrome.storage.sync.get(prop, (data) => {
    input.value = data[prop] || "None set";
  })
  
  button.onclick = (e) => {
    chrome.storage.sync.set({[prop]: input.value}, function() {
      console.log('token is ' + input.value);
    })
  }
}


const init = () => {
  syncInput('hypTokenInput', 'hypTokenSubmit');
  syncInput('hypUserInput', 'hypUserSubmit');
  syncBox('autoFetch');
  syncBox('autoCopy');
}

init();