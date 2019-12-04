'use strict';

chrome.runtime.onInstalled.addListener(function() {
    let searchOnOxfordContext = {
        "id": "SearchOnOxford",
        "title": "Search on OxfordLearnerDictionary",
        "contexts": ["selection"]
    }
    let searchOnGoogleTranslateContext = {
        "id": "SearchOnGoogleTranslate",
        "title": "Search on Google Translate",
        "contexts": ["selection"]
    }
    chrome.contextMenus.create(searchOnOxfordContext);
    chrome.contextMenus.create(searchOnGoogleTranslateContext);

    chrome.contextMenus.onClicked.addListener(function (clickedData) {
        if (!clickedData.selectionText) return

        let searchURL = ""
        switch(clickedData.menuItemId ) {
            case "SearchOnOxford":
                searchURL = "https://www.oxfordlearnersdictionaries.com/search/english/?q={searchText}"
                break;
            case "SearchOnGoogleTranslate":
                searchURL = "https://translate.google.com/#view=home&op=translate&sl=en&tl=vi&text={searchText}"
                break;
            default:
        }
        searchURL = searchURL.replace("{searchText}", clickedData.selectionText)
        chrome.tabs.create({ url: searchURL });
    });
});
