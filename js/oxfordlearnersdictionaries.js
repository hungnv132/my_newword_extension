
let wordName = $("#entryContent .top-container .headword");
let wordMeans = $("#entryContent .senses_multiple span.def");
// wordName.css('background-color', 'green');
// wordMeans.css('background-color', 'green');

chrome.storage.local.set(
	{
		'word': wordName.text(),
	}
);
chrome.storage.local.set(
	{
		'mean1': wordMeans.eq(0).text(),
	}
);
chrome.storage.local.set(
	{
		'mean2': wordMeans.eq(1).text(),
	}
);

