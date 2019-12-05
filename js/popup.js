// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let createWordAPI = '';

let wordName 	= $("#wordForm #wordName");
let vietnamese 	= $("#wordForm #vietnamese");
let wordMean1 	= $("#wordForm #wordMean1");
let wordMean2 	= $("#wordForm #wordMean2");
let tags 		= $("#wordForm #tags");
let wordType	= $("#wordForm #wordType");
let btnSubmit	= $("#wordForm #btnSubmit");
let resultBox	= $("#wordForm #resultBox");

function clearData() {
    wordName.val('');
    vietnamese.val('');
    wordMean1.val('');
    wordMean2.val('');
    wordType.val(0);
    resultBox.val('');
    tags.val('');
};

function getWordName() {
    return wordName.val().trim();
}

function loadDataFromStorage() {
    chrome.storage.local.get('word', function(result) {
        wordName.val(result.word)
    });
    chrome.storage.local.get('mean1', function(result) {
        wordMean1.val(result.mean1)
    });
    chrome.storage.local.get('mean2', function(result) {
        wordMean2.val(result.mean2)
    });
};

function validateForm() {
    let isOk = true
    resultBox.text('')

    let wordNameValue = getWordName();
    if (!wordNameValue) {
        isOk = false;
        resultBox.text('Word Name must not emtpy.');
    }
    return isOk

}

function preparePayload() {
    let tagValue = tags.val().trim();
    let means = []

    let payload = {
        name: getWordName(),
        vietnamese: vietnamese.val().trim() || null,
        type: parseInt(wordType.val()),
    }
    if (wordMean1.val()) {
        means.push(wordMean1.val())
    }
    if (wordMean2.val()) {
        means.push(wordMean2.val())
    }
    if (means.length > 0) {
        payload['means'] = means
    }
    if (tagValue) {
        payload['tags'] = tagValue.split(',')
    }
    return payload
}

$( document ).ready(function() {
    // load data from storage
    loadDataFromStorage();

    // handle when click the button "submit"
    btnSubmit.click(function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return
        }
        let payload = preparePayload();

        $.ajax({
            url: createWordAPI,
            dataType: "json",
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: "application/json",
            error: function(xhr, status, error) {
                resultBox.text(xhr.responseText)
            },
        }).done(function (response) {
            clearData();
            resultBox.text("Sucess!")
        })

    });
});
