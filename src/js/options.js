import "../css/options.css";



function syncData(inputId, buttonId) {
  
  const input = document.getElementById(inputId);
  const button = document.getElementById(buttonId);
  const prop = input.name;

  chrome.storage.sync.get(prop, (data) => {
    input.value = data[prop] || "None set";
  })
  
  button.onclick = (e) => {
    chrome.storage.sync.set({[prop]: input.value}, function() {
      console.log('token is ' + input.value);
    })
  }
}

syncData('hypTokenInput', 'hypTokenSubmit');
syncData('hypUserInput', 'hypUserSubmit');