/**
 * Created by Finnur on 19-11-2015.
 */

//login funktion
$(document).ready(function () {
    $(".login-button").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var password = $('#password').val();
        var username = $('#username').val();
        var data = {
            username: username,
            password: password,
        };
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: "post",
            url: "http://localhost:8888/api/login",
            data: JSON.stringify(data),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 200 bliver man logget ind
                $.session.set('userId', data.userid);
                window.location.href = '../html/menu.html';
//når brugeren har fået accept om at komme ind bliver det lavet en session af hans userId
            },
            error: function (err) {
                console.log(err);
//hvis status fra serveren ikke kommer tilbage med 200 er der en fejl og brugeren kommer ikke ind
                alert('Something went wrong')
            }
        });
    });
});

//create user function
$(document).ready(function () {
    $(".create-user").click(function () {
//her laver man et objekt af det som brugeren taster ind
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
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: 'POST',
            url: 'http://localhost:8888/api/users',
            data: JSON.stringify(user),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 200 bliver der en bruger oprettet
                alert('User is made');
                window.location.href = '../html/login.html';
//når brugeren er lavet bliver han sent til login.html for at logge ind
            },
            error: function (err) {
                console.log(err);
//hvis status fra serveren ikke kommer tilbage med 200 er der en fejl og brugeren oprettes ikke
                alert('Something went wrong');
            }
        });
    });
});

//create game function
$(document).ready(function () {
    $(".create-game").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var createGame = {
            name: $('#name').val(),
            host: {
//get metode som tager den id som er blevet logget ind fra session set
                id: $.session.get('userId'),
                controls: $('#controls').val()
            },
            mapSize: $('#mapSize').val()
        };
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: 'POST',
            url: 'http://localhost:8888/api/games',
            data: JSON.stringify(createGame),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 201 bliver der lavet et spil
                alert('Game is Created');
                window.location.href = '../html/menu.html';
//når spillet er lavet bliver brugeren sent til menu.html
            },
            error: function (err) {
                console.log(err);
//hvis status fra serveren ikke kommer tilbage med 201 er der en fejl og spillet bliver ikke lavet
                alert('Something went wrong');
            }
        });
    });
});

//join open game tabel
$(document).ready(function () {
//her bliver ajax indstillinger lavet
    $.ajax({
        async: true,
        type: "GET",
        url: "http://localhost:8888/api/games/open",
//så sendes de indstillinger til serveren
        success: function (data, status, xhr) {
            console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 201 bliver tabellen vist
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
//hvis status fra serveren ikke kommer tilbage med 201 er der en fejl og tabellen kommer ikke frem
        }
    });
});

//join games function
$(document).ready(function () {
    $(".join-game").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var game = $("#gameId").val();
        var joinGameNow = {
            gameId: game,
            opponent: {
//get metode som tager den id som er blevet logget ind fra session set
                id: $.session.get('userId')
            }
        };
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: "POST",
            url: "http://localhost:8888/api/games/join",
            data: JSON.stringify(joinGameNow),
//så sendes de indstillinger til serveren
            success:function(data, status, xhr) {
                console.log(data, status, xhr)
//hvis indstillingerne får en succes og status fra server er 201 joiner brugeren spillet
                alert("Game ready to start");
                window.location.href = '../html/start-game.html';
                $.session.set('gameId', game);
//når spillet er bliver der lavet en session set af game ID og brugeren bliver sent til Start-game.html
            },
            error: function (err) {
                console.log(err);
//når der er en POST type kan spilleren joine selv om den kommer ud med error og status bliver til pending
                alert('Game ready to start');
                window.location.href = '../html/start-game.html';
                $.session.set('gameId', game);
//når spillet er bliver der lavet en session set af game ID og brugeren bliver sent til Start-game.html
            }
        });
    });
});

// Start game function
$(document).ready(function () {
    $(".start-game").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var startGame = {
//get metode som tager den id fra den
            //get metode som tager den id som er blevet logget ind fra session set
            gameId: $.session.get("gameId"),
            opponent: {
                controls: $('#OpponentControls').val()
            }
        };
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: 'POST',
            url: 'http://localhost:8888/api/games/start/',
            data: JSON.stringify(startGame),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 201 begynder spillet
                alert('Game is Finnished');
                window.location.href = '../html/menu.html';
//når spillet er færdigt bliver spilleren sent tilbage til menu.html
            },
            error: function (err) {
                console.log(err);
//hvis status fra serveren ikke kommer tilbage med 201 er der en fejl og spillet starter ikke
                alert('Something went wrong');
            }
        });
    });
});

//open pending game tabel
$(document).ready(function () {
    $(".See-game").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var gameId = $("#DeleteID").val();
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: "GET",
            url: "http://localhost:8888/api/games/pending/" +  $("#DeleteID").val(),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 201 kommer tabellen frem
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
//hvis status fra serveren ikke kommer tilbage med 201 er der en fejl og tabllen kommer ikke frem
            }
        });
    });
});

//Delete game table
$(document).ready(function () {
    $(".Delete-game").click(function () {
//her laver man et objekt af det som brugeren taster ind
        var gameId = $("#gameId").val();
//her bliver ajax indstillinger lavet
        $.ajax({
            async: true,
            type: 'POST',
            url: 'http://localhost:8888/api/games/' + $("#gameId").val(),
            data: JSON.stringify(gameId),
//så sendes de indstillinger til serveren
            success: function (data, status, xhr) {
                console.log(data, status, xhr)
//hvis indstillingerne får en succes og status fra server er 200 bliver spillet slettet
                alert('Game is Deleted');
                window.location.href = '../html/menu.html';
//når spillet er slettet sendes brugeren tilbage til menu.html
            },
            error: function (err) {
                console.log(err);
//hvis status fra serveren ikke kommer tilbage med 200 er der en fejl og spillet bliver ikke slettet
                alert('Something went wrong');
            }
        });
    });
});

//Highscre tabel
$(document).ready(function () {
//her bliver ajax indstillinger lavet
    $.ajax({
        async: true,
        type: "GET",
        url: "http://localhost:8888/api/scores",
//så sendes de indstillinger til serveren
        success: function (data, status, xhr) {
            console.log(data, status, xhr);
//hvis indstillingerne får en succes og status fra server er 201 kommer tabellen frem
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
//hvis status fra serveren ikke kommer tilbage med 201 er der en fejl og tabellen kommer ikke frem
        }
    });
});
