/**
 * Created by Finnur on 19-11-2015.
 */

//login funktion
$(document).ready(function () {

    $(".login-button").click(function () {

        var password = $('#password').val();
        var username = $('#username').val();


        var data = {
            username: username,
            password: password,
        };

        $.ajax({
            type: "post",
            url: "http://localhost:8888/api/login",
            data: JSON.stringify(data),
            success: function (data, status, xhr) {

                    window.location.href = '../html/menu.html';

            },
            error: function () {
                console.log();

                alert('nope')

            }


        });

    });

});

//create-user funktin
$(document).ready(function () {

    $(".create-user").click(function () {

        var Firstname = $('#firstName').val();
        var Lastname = $('#lastName').val();
        var Email = $('#email').val();
        var Username = $('#username').val();
        var Password = $('#password').val();
        var user = {
            firstName: Firstname,
            lastName: Lastname,
            email: Email,
            username: Username,
            password: Password
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/users',
            data: JSON.stringify(user),
            beforeSend: function () {
                // this is where we append a loading image
                $('form').append('loader');
            },
            success: function (data) {
                // successful request; do something with the data
                alert('Ny user');
                window.location.href = '../html/menu.html';
            },
            error: function () {
                // failed request; give feedback to user

                alert('hey');

            }
        });
    });

});

//create-game funktion
$(document).ready(function () {

    $(".create-game").click(function () {

        var createGame = {
            name: $('#name').val(),
            opponent: {
                id: $('#opponent').val()
            },
            host: {
                id: $('#host').val(),
                controls: $('#controls').val()
            },
            mapSize: $('#mapSize').val()

        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games',
            data: JSON.stringify(createGame),
            beforeSend: function () {
                // this is where we append a loading image
                $('form').append('loader');
            },
            success: function (data) {
                // successful request; do something with the data
                alert('Ny spil');
                window.location.href = 'menu.html';
            },
            error: function (err) {
                console.log(err);
                // failed request; give feedback to user

                alert('nope');

            }
        });
    });
});

//join-game funktion
$(document).ready(function () {

    $(".join-game").click(function () {

        var updateGame = {


            /*
             name: $('#name').val(),
             opponent: {
             id: $('#opponent').val()
             },
             host: {
             id: $('#host').val(),
             controls: $('#controls').val()
             },
             mapSize: $('#mapSize').val()
             */
        };

        $.ajax({
            type: 'PUT',
            url: 'http://localhost:8888/api/games/join',
            data: JSON.stringify(updateGame),
            beforeSend: function () {
                // this is where we append a loading image
                $('form').append('loader');
            },
            success: function (data) {
                // successful request; do something with the data
                alert('Ny spil');
                window.location.href = 'menu.html';
            },
            error: function (err) {
                console.log(err);
                // failed request; give feedback to user

                alert('nope');

            }
        });
    });
});

//Delete-game funktion
$(document).ready(function () {

    $(".Delete-game").click(function () {

        var gameId = $("#gameDeleeid").val();


        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games/' + $("#gameId").val(),
            data: JSON.stringify(gameId),


            beforeSend: function () {
                // this is where we append a loading image
                $('form').append('loader');
            },
            success: function (data, status, xhr) {
                // successful request; do something with the data
                alert('spillet er deletet');
                console.log(data, status, xhr)
                window.location.href = 'menu.html';
            },
            error: function (err, status, xhr) {
                console.log(err, status, xhr);
                // failed request; give feedback to user

                alert('nope');

            }

        });
    });
});
/*
$(document).ready(function () {
$(".Delete-game").click(function () {

    var deleteGame = {

        "async": true,
        "crossDomain": true,
        "url": 'http://localhost:8888/api/games/' + $("#gameid").val(),
        "method": "POST"
    };

    $.ajax(deleteGame).done(function (response) {
        console.log(response);
        alert("Game Successfully Deleted");
        window.location.replace("MainMenu.html");

    });
});
});
    */