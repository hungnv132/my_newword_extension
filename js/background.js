'use strict';

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({
        "id": "SearchOnOxford",
        "title": "Search on OxfordLearnerDictionary",
        "contexts": ["selection"]
    });

    chrome.contextMenus.onClicked.addListener(function (clickedData) {
        if (clickedData.menuItemId == "SearchOnOxford" && clickedData.selectionText) {
            let searchURL = "https://www.oxfordlearnersdictionaries.com/search/english/?q="
            searchURL += clickedData.selectionText
            chrome.tabs.create({ url: searchURL });
        }
    });
});
