// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let loginAPI = '';

let usernameElement 	= $("#loginForm #username");
let passwordElement 	= $("#loginForm #password")
let btnSubmitElement 	= $("#loginForm #btnSubmit")
let resultBoxElement 	= $("#loginForm #resultBox")

function clearData() {
    username.val('');
    password.val('');
};

function getUsername() {
    return usernameElement.val().replace(' ', '')
}
function getPassword() {
    return passwordElement.val()
}


function validateForm() {
    let isOk = true
    resultBoxElement.text('')

    let username = getUsername();
    let password = getPassword();
    errors = []
    if (!username) {
        isOk = false;
        errors.push('Username must not emtpy.')
    }
    if (!password) {
        isOk = false;
        errors.push('Password must not emtpy.')
    }
    if (errors.length > 0) {
        error_text = errors.join('; ')
        resultBoxElement.text(error_text);

    }
    return isOk
}

function preparePayload() {
    let payload = {
        username: getUsername(),
        password: getPassword(),
    }
    return payload
}

$( document ).ready(function() {
    // handle when click the button "submit"
    btnSubmitElement.click(function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return
        }
        let payload = preparePayload();

        $.ajax({
            url: loginAPI,
            dataType: "json",
            type: 'POST',
            data: JSON.stringify(payload),
            contentType: "application/json",
            error: function(xhr, status, error) {
                resultBoxElement.text(xhr.responseText)
            },
        }).done(function (response) {
            clearData();
            resultBoxElement.text("Sucess!")
        })

    });
});
