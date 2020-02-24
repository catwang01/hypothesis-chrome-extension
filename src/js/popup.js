import '../css/popup.css';
import '../css/tooltip.css';
import hyp from './hypothesis/index';

import pdfjsLib from 'pdfjs-dist';

// console.log(pdfjsLib)

const getHypothesisURI = async () => 
  new Promise(res => {
    chrome.tabs.query({ currentWindow: true, active: true }, async tabs => {
    // chrome.tabs.query({ lastFocusedWindow: true, active: true }, async tabs => {
      console.log('Tabs: :', tabs);
      const urlObject = new URL(tabs[0].url);
      console.log('URL: ', urlObject.href);
  
      let url = decodeURI(urlObject.href.toString().replace(/#.*/, ''));
      if (
        urlObject.href.endsWith('.pdf') ||
        urlObject.pathname.endsWith('.pdf') || 
        urlObject.pathname === '/pdfjs/web/viewer.html'
        ) {
        if (urlObject.protocol === 'chrome-extension:') {
          url = decodeURIComponent(urlObject.search.slice(6));
        }
        const doc = await pdfjsLib.getDocument(url).promise;
        console.log('PDF fingerprint: ', doc.fingerprint);
        res(`urn:x-pdf:${doc.fingerprint}`);
      } else {
        res(url);
      }
    });
  })



// getHypothesisURI().then(console.log);
// console.log(pdfjsLib.PDFJS.PDFViewer)

// const pdfaPath =

// console.log(
//   pdfjsLib.getDocument(url)
//   )

// main function
const run = data => {
  const { autoCopy, autoFetch, hypUser, hypToken } = data;
  // console.log(data);

  const fetchBtn = document.getElementById('fetchBtn');
  const copyBtn = document.getElementById('copyBtn');

  fetchBtn.onclick = async e => {
    console.log('clicked');
    // get current tab url

    // chrome.tabs.query({ lastFocusedWindow: true, active: true }, async tabs => {
      // const url = tabs[0].url;

      // console.log(url);
      // console.log(hypUser, hypToken);
      const url = await getHypothesisURI();
      const annotations = await hyp(url, hypUser, hypToken);

      const textArea = document.getElementById('annotationArea');
      textArea.value = annotations;
      // console.log(annotations);

      // auto copy to clipboard
      autoCopy && copyBtn.click();
    // });
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
