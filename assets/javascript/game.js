$(document).ready(function () {
    var config = {
        apiKey: "AIzaSyBGpS0HkvjevQ1EAm-D5-tM16hKJtGHnHc",
        authDomain: "rock-paper-scisso.firebaseapp.com",
        databaseURL: "https://rock-paper-scisso.firebaseio.com",
        projectId: "rock-paper-scisso",
        storageBucket: "rock-paper-scisso.appspot.com",
        messagingSenderId: "1023291345456",
        appId: "1:1023291345456:web:1b970f64f4f44529"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    var myGlobal = {
        players: 0,
        player1: false,
        player2: false,
        assignedRole: "not a player",
        waitingForOpponent: false
    }

    database.ref().on("value", function (snapshot) {

    });

    $("#start-button").on("click", function (event) {
        if (myGlobal.players === 0 && !myGlobal.player1) {
            myGlobal.assignedRole = "Player 1";

            myGlobal.player1 = true;

            myGlobal.waitingForOpponent = true;

            $("#start-div").addClass("d-none");

            var greetingText = $("<h2>");

            greetingText.text("Welcome to the game, Player 1!").addClass("mb-0");

            var waitText = $("<h2>");

            waitText.text("Waiting for opponent...");

            var loaderGif = $("<img>");

            loaderGif.attr("src", "assets/images/loader.gif");

            $("#wait-div").removeClass("d-none").append(greetingText, loaderGif, waitText);
        }

        else {
            $("#start-div").addClass("d-none");

            $("#game-div").removeClass("d-none");
        };
    });

});