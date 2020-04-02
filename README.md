# Hypothesis to bullets chrome extension

Browser extension for fetching and formatting [Hypothes.is](https://web.hypothes.is/about/) annotations into markdown bullet points, ready for copying into Roam, Notion or similar apps.

## Install

### From zip
1. Download the [latest release](https://github.com/dalmo3/hypothesis-to-bullets-chrome-extension/releases) and extract into a new folder
2. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the folder you created.

### Using `npm`
1. Run `npm run build`
2. Load your extension on Chrome following:
    1. Access `chrome://extensions/`
    2. Check `Developer mode`
    3. Click on `Load unpacked extension`
    4. Select the `build` folder.

More info on the upstream project: https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate

## Usage

1. Open options page (Right-click on the extension) and add your details and preferences.
2. Visit the page where you have annotations.
3. Open the extension
4. For local PDF support, Right-click -> Manage Extensions -> Allow access to file URLs

## Changelog
```
0.2.1
  Added some debug messages
0.2.0
  Added PDF support
0.1.0
  Initial Version
```

## Troubleshooting

If you're having trouble to fetch annotations or highlights on a specific page, 
1. Right-click the extension button -> Inspect popup;
1. On the Console:
  1. Check if `URL` is correct
  1. Check for `{total: 0, rows: Array(0)}`. Zero means nothing was found on Hypothes.is servers.
  1. Check for general errror messages. Ignore `Uncaught (in promise) DOMException: Document is not focused.` for now;
  1. Open an [issue](https://github.com/dalmo3/hypothesis-to-bullets-chrome-extension/issues)

## Known Issues
- Only fetches the first 200 annotations from a page
- Won't fetch annotations from PDFs while the official Hypothes.is browser extension is open 

## Credits

This project was made possible thanks to:
  - Samuel Simões for [chrome-extension-webpack-boilerplate](https://github.com/samuelsimoes/chrome-extension-webpack-boilerplate)
  - Stian Håklev for the [annotations fetching and processing code](https://github.com/houshuang/hypothesis-to-bullet)
  - And of course the people at [Hypothes.is](https://web.hypothes.is/about/)

-------------
Dalmo Mendonça ~ [@dalmo3](https://twitter.com/dalmo3)