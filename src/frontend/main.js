$(function() {
    var $window = $(window);
    var $usernameInput = $(".usernameInput");
    var $inputMessage = $(".inputMessage");
    var $submitBtn = $("#submit-button");

    var $loginPage = $(".login.page");
    var $chatPage = $(".chat.page");

    var username;
    var connected = false;
    var $currentInput = $usernameInput.focus();

    var socket = io();

    const setUsername = () => {
        username = $usernameInput.val();
    };

  
    $submitBtn.click(() => {
        $.ajax({
            url: "http://localhost:3000/login",
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
    });

});