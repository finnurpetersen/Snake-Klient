/**
 * Created by Finnur on 19-11-2015.
 */

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


$(".create-user").click(function(){

    var Firstname =$('#firstName').val();
    var Lastname =$('#lastName').val();
    var Email =$('#email').val();
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
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny user');
            window.location.href = '../html/menu.html';
        },
        error:function(){
            // failed request; give feedback to user

            alert('hey');

        }
    });
});

$(".create-game").click(function(){

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
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny spil');
            window.location.href = 'menu.html';
        },
        error:function(err){
            console.log(err);
            // failed request; give feedback to user

            alert('nope');

        }
    });
});

$(".join-game").click(function(){

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
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny spil');
            window.location.href = 'menu.html';
        },
        error:function(err){
            console.log(err);
            // failed request; give feedback to user

            alert('nope');

        }
    });
});

$(".Delete-game").click(function(){

    var deleteUser = {
    userId: $('#userId').val()

    };

    $.ajax({
        type: 'GET',
        url: 'http://localhost:8888/api/users/delete/{userid}',
        data: JSON.stringify(deleteUser),
        beforeSend:function(){
            // this is where we append a loading image
            $('form').append('loader');
        },
        success:function(data){
            // successful request; do something with the data
            alert('Ny spil');
            window.location.href = 'menu.html';
        },
        error:function(err){
            console.log(err);
            // failed request; give feedback to user

            alert('nope');

        }
    });
});