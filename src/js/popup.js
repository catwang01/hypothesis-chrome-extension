import '../css/popup.css';
import '../css/tooltip.css';
import hello from './popup/example';
import hyp from './hypothesis/index.js';
import button from './popup/button';

const run = (data) => {
  const { autoCopy, autoFetch, hypUser, hypToken } = data;
  console.log(data)

  
  const fetchBtn = document.getElementById('fetchBtn');
  const copyBtn = document.getElementById('copyBtn');
  copyBtn.onclick = e => {
    const textArea = document.getElementById('h2b');
    navigator.clipboard.writeText(textArea.value).then();
    document.getElementById('copyTt').style.visibility = 'visible';
    setTimeout(()=>
    document.getElementById('copyTt').style.visibility = 'hidden', 1000)
  }
  
  fetchBtn.onclick = e => {
    console.log('clicked');
    chrome.tabs.query({ active: true }, async (tabs) => {
      const url = tabs[0].url;
      console.log(url);
          console.log(hypUser, hypToken);
          const h2b = await hyp(url, hypUser, hypToken);
          const textArea = document.getElementById('h2b');
          textArea.value = h2b;
          console.log(h2b)

          autoCopy && copyBtn.click();          
        }
        );
      };
      
  autoFetch && fetchBtn.click();
    }
    
    
    const init = (done) => {
      console.log('opened')
      chrome.storage.sync.get(['autoCopy', 'autoFetch', 'hypUser', 'hypToken'], done)
    }
    
    init(run);