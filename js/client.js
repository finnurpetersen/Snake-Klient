/**
 * Created by Finnur on 19-11-2015.
 */

//login function
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
                console.log(data, status, xhr);

                    window.location.href = '../html/menu.html';

            },
            error: function (err) {
                console.log(err);

                alert('nope')

            }


        });

    });

});

//create-user function
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
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
                // successful request; do something with the data
                alert('Ny user');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);
                // failed request; give feedback to user

                alert('nope');

            }
        });
    });

});

//create-game function
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
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
                // successful request; do something with the data
                alert('Ny spil');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);
                // failed request; give feedback to user

                alert('nope');

            }
        });
    });
});

//join-game table
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://localhost:8888/api/games/open",
        success: function (data, status, xhr) {
            console.log(data, status, xhr);

            data.forEach(function (item) {

                var table = '<tr>' +
                    '<td>' + item.gameId + '</td>' +
                    '<td>' + item.host.id + '</td>' +
                    '<td>' + item.name + '</td>' +
                    '<td>' + item.mapSize + '</td>' +
                    '<td>' + item.created + '</td></tr>';

                $('#joinGameTable').append(table);
            });
        },
        error: function (err) {
            console.log(err);
        }

    });

    //join games


    $(".join-game").click(function () {

        var game = $("#gameId").val();



        var joinGameNow = {
            gameId: game,
            opponent: {
                id: $('#opponent').val()
            }
        };

        $.ajax({
            type: "POST",
            url: "http://localhost:8888/api/games/join",
            data: JSON.stringify(joinGameNow),
            success:function(data, status, xhr) {
                console.log(data, status, xhr);

                alert("Game joind");

                window.location.href = '../html/menu.html';

            },
            error: function (err) {
                console.log(err);

                alert('nope');

            }
        });
    });
});



//Delete-game funktion
$(document).ready(function () {

    $(".YourGame").click(function () {

    var HostId = $("#HostId").val();

$.ajax({
    type: "GET",
    url: "http://localhost:8888/api/games/host" + $("#HostId").val(),
    success: function (data, status, xhr) {
        console.log(data, status, xhr);

        data.forEach(function (item) {

            var table1 = '<tr>' +
                '<td>' + item.gameId + '</td>' +
                '<td>' + item.status + '</td>' +
                '<td>' + item.winner + '</td>' +
                '<td>' + item.mapSize + '</td>' +
                '<td>' + item.created + '</td></tr>';

            $('#YourGameTable').append(table1);
        });
    },
    error: function (err) {
        console.log(err);
    }

});
    });




    $(".Delete-game").click(function () {

        var gameId = $("#gameId").val();


        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games/' + $("#gameId").val(),
            data: JSON.stringify(gameId),
            success: function (data, status, xhr) {
                console.log(data, status, xhr)
                // successful request; do something with the data
                alert('spillet er deletet');

                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);
                // failed request; give feedback to user

                alert('nope');

            }

        });
    });
});
