$(function () {
    const FADE_TIME = 150;
    const URL = document.location.href;
    var $window = $(window);
    var $usernameInput = $(".usernameInput");
    var $inputMessage = $(".inputMessage");
    var $submitBtn = $("#submit-button");
    var $messages = $(".messages");

    var $loginPage = $(".login.page");
    var $chatPage = $(".chat.page");

    var username;
    var connected = false;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    const setUsername = () => {
        username = $usernameInput.val();
    };

    const addParticipantsMessage = (data) => {
        var message = "";
        if (data.numUsers === 1) {
            message += "There is 1 participant";
        } else {
            message += "There are " + data.numUsers + " participants";
        }
        log(message);
    };

    const sendMessage = () => {
        var message = $inputMessage.val();
        if (message && connected) {
            $inputMessage.val("");
            addChatMessage({
                username: username,
                message: message
            });
            socket.emit("new message", message);
        }
    };

    const addChatMessage = (data, options) => {
        options = options || {};
        var $usernameDiv = $('<span class="username"/>')
            .text(data.username);
        var $messageBodyDiv = $('<span class="messageBody">')
            .text(data.message);
            
        var $messageDiv = $('<li class="message"/>')
            .data('username', data.username)
            .append($usernameDiv, $messageBodyDiv);
        
        addMessageElement($messageDiv, options);
    }

    const log = (message, options) => {
        var $el = $("<li>").addClass("log").text(message);
        addMessageElement($el, options);
    };

    const addMessageElement = (el, options) => {
        var $el = $(el);
        if (!options) {
            options = {};
        }
        if (typeof options.fade === 'undefined') {
            options.fade = true;
        }
        if (typeof options.prepend === 'undefined') {
            options.prepend = false;
        }

        // Apply options
        if (options.fade) {
            $el.hide().fadeIn(FADE_TIME);
        }
        if (options.prepend) {
            $messages.prepend($el);
        } else {
            $messages.append($el);
        }
        $messages[0].scrollTop = $messages[0].scrollHeight;
    };

    const ajaxLogin = () => {
        $.ajax({
            url: `${URL}login`,
            crossDomain: true,
            type: "POST",
            data: $usernameInput.val(),
            contentType: "text/plain",
            dataType: "text",
            success: () => {
                setUsername();
                $loginPage.fadeOut();
                $chatPage.show();
                $loginPage.off("click");
                $currentInput = $inputMessage.focus();

                socket.emit("add user", username);
            }
        });
    };

    const ajaxSaveMessage = (username, content) => {
        const data = JSON.stringify({ "username": username, "content": content });
        $.ajax({
            url: `${URL}save`,
            crossDomain: true,
            type: "POST",
            data: data,
            contentType: "application/json",
            dataType: "json",
            success: () => {
                console.log("New message saved");
            }
        });
    }
    // key events
    $window.keydown(event => {
        if (!event.ctrlKey || event.metaKey || event.altKey) {
            $currentInput.focus();
        }
       
        if (event.which === 13) {
            if (username !== undefined) {
                var content = $inputMessage.val();
                ajaxSaveMessage(username, content);
                sendMessage();
            } else {
                ajaxLogin();
            }
        }
    })

    $submitBtn.click(() => {
        ajaxLogin();
    });

    // socket events
    socket.on("login", data => {
        connected = true;
        var message = "Welcome to Free Chat -";
        log(message, {
            prepend: true
        });
        addParticipantsMessage(data);
    });

    socket.on("user joined", data => {
        log(data.username + " joined")
    })

    socket.on("new message", (data) => {
        addChatMessage(data);
    });
});