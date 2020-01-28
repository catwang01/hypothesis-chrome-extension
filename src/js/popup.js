import '../css/popup.css';
import '../css/tooltip.css';
import hyp from './hypothesis/index';

// main function
const run = data => {
  const { autoCopy, autoFetch, hypUser, hypToken } = data;
  // console.log(data);
  
  const fetchBtn = document.getElementById('fetchBtn');
  const copyBtn = document.getElementById('copyBtn');
  
  fetchBtn.onclick = e => {
    console.log('clicked');
    // get current tab url
    chrome.tabs.query({ lastFocusedWindow: true, active: true }, async tabs => {
      const url = tabs[0].url;

      // console.log(url);
      // console.log(hypUser, hypToken);
      
      const annotations = await hyp(url, hypUser, hypToken);
      
      const textArea = document.getElementById('annotationArea');
      textArea.value = annotations;
      // console.log(annotations);
      
      // auto copy to clipboard
      autoCopy && copyBtn.click();
    });
  };
  
  copyBtn.onclick = e => {
    //copy to clipboard
    const textArea = document.getElementById('annotationArea');
    navigator.clipboard.writeText(textArea.value).then();
    
    //display tooltip
    document.getElementById('copyTt').style.visibility = 'visible';
    setTimeout(
      () => (document.getElementById('copyTt').style.visibility = 'hidden'),
      1000
    );
  };

  // auto fetch
  autoFetch && fetchBtn.click();
};

const init = callback => {
  console.log('opened');
  // get user data
  chrome.storage.sync.get(
    ['autoCopy', 'autoFetch', 'hypUser', 'hypToken'],
    callback // fetched data is passed to callback
  );
};

init(run);
