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

                $.session.set('userId', data.userid);
                window.location.href = '../html/menu.html';

            },
            error: function (err) {
                console.log(err);

                alert('Something went wrong')
            }
        });
    });
});

//create user function
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

                alert('User is made');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);

                alert('Something went wrong');
            }
        });
    });
});

//create game function
$(document).ready(function () {
    $(".create-game").click(function () {

        var createGame = {
            name: $('#name').val(),
            host: {
                id: $.session.get('userId'),
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

                alert('Game is Created');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);

                alert('Something went wrong');
            }
        });
    });
});

//join open game table
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
});

//join games function
$(document).ready(function () {
    $(".join-game").click(function () {

        var game = $("#gameId").val();

        console.log(gameId);

        var joinGameNow = {
            gameId: game,
            opponent: {
                id: $.session.get('userId')
            }
        };
        console.log(JSON.stringify((joinGameNow)));

        $.ajax({
            type: "POST",
            url: "http://localhost:8888/api/games/join",
            data: JSON.stringify(joinGameNow),
            success:function(data, status, xhr) {
                console.log(data, status, xhr)

                alert("Game ready to start");
                window.location.href = '../html/start-game.html';
                $.session.set('gameId', game);
            },
            error: function (err) {
                console.log(err);
                alert('Game ready to start');
                window.location.href = '../html/start-game.html';
                $.session.set('gameId', game);
            }
        });
    });
});

// Start game function
$(document).ready(function () {
    $(".start-game").click(function () {

        var startGame = {
            gameId: $.session.get("gameId"),
            opponent: {
                controls: $('#OpponentControls').val()
            }
        };
        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games/start/',
            data: JSON.stringify(startGame),

            success: function (data, status, xhr) {
                console.log(data, status, xhr);

                alert('Game is Finnished');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);

                alert('Something went wrong');
            }
        });
    });
});

//open pending game table
$(document).ready(function () {
    $(".See-game").click(function () {

        var gameId = $("#DeleteID").val();

        $.ajax({
            type: "GET",
            url: "http://localhost:8888/api/games/pending/" +  $("#DeleteID").val(),

            success: function (data, status, xhr) {
                console.log(data, status, xhr);

                data.forEach(function (item) {

                    var table2 = '<tr>' +
                        '<td>' + item.gameId + '</td>' +
                        '<td>' + item.host.id + '</td>' +
                        '<td>' + item.name + '</td>' +
                        '<td>' + item.created + '</td></tr>';

                    $('#YourGameTable').append(table2);
                });
            },
            error: function (err) {
                console.log(err);
            }
        });
    });
});

//Delete game table
$(document).ready(function () {
    $(".Delete-game").click(function () {

        var gameId = $("#gameId").val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8888/api/games/' + $("#gameId").val(),
            data: JSON.stringify(gameId),

            success: function (data, status, xhr) {
                console.log(data, status, xhr)

                alert('Game is Deleted');
                window.location.href = '../html/menu.html';
            },
            error: function (err) {
                console.log(err);

                alert('Something went wrong');
            }
        });
    });
});

//Highscre table
$(document).ready(function () {

    $.ajax({
        type: "GET",
        url: "http://localhost:8888/api/scores",

        success: function (data, status, xhr) {
            console.log(data, status, xhr);

            data.forEach(function (item) {

                var table2 = '<tr>' +
                    '<td>' + item.score + '</td>' +
                    '<td>' + item.user.username + '</td>' +
                    '<td>' + item.game.name + '</td>' +
                    '<td>' + item.game.gameId + '</td></tr>';

                $('#HighscoreTable').append(table2);
            });
        },
        error: function (err) {
            console.log(err);
        }
    });
});


