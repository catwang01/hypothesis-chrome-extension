import '../css/popup.css';
import '../css/tooltip.css';
import hello from './popup/example';
import hyp from './hypothesis/index.js';
import button from './popup/button';

// hyp();
hello();

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   alert(tab.url)
//   // chrome.tabs.executeScript({
//   //   code: 'document.body.style.backgroundColor="red"'
//   // });
// });

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
  
  chrome.tabs.query({ active: true }, function(tabs) {
    const url = tabs[0].url;
    console.log(url);
    chrome.storage.sync.get(
      ['hypUser', 'hypToken'],
      async ({ hypUser, hypToken }) => {
        console.log(hypUser, hypToken);
        // const url = 'https://fs.blog/2017/06/habits-vs-goals/';
        // const user = 'dalmo3';
        const h2b = await hyp(url, hypUser, hypToken);
        const textArea = document.getElementById('h2b');
        textArea.value = h2b;
        // navigator.clipboard.writeText(textArea.innerHTML);
        console.log(h2b)

      }
    );
  });
};
// const test = () => alert('ho');
// export test;
