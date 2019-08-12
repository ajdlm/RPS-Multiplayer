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

    function startGame() {
        $("#start-div").addClass("d-none");

        $("#game-div").removeClass("d-none");
    };

    function getHype(x) {
        $("#wait-div").empty();

        var countDownText = $("<h2>");

        if (x === 4) {
            countDownText.text("Rock...");
        }

        else if (x === 3) {
            countDownText.text("Paper...")
        }

        else if (x === 2) {
            countDownText.text("Scissors...")
        }

        else {
            countDownText.text("Shoot!")
        };

        $("#wait-div").append(countDownText);
    };

    function getReady() {
        var countDown = 4;

        var countTimer = setInterval(function () {
            countDown--;

            if (countDown > 0) {
                getHype(countDown);
            }

            else if (countDown === 0) {
                clearInterval(countTimer);
                startGame();
            };
        }, 1000);
    };

    function greetPlayer(x) {
        $("#wait-div").empty();

        var letsStartText = $("<h2>");

        letsStartText.text("Welcome to the game, Player " + x + "!")

        setTimeout(getReady, 2000);
    };

    database.ref().on("value", function (snapshot) {

    });

    $("#start-button").on("click", function (event) {
        if (myGlobal.players === 0 && !myGlobal.player1) {
            myGlobal.assignedRole = "Player 1";

            myGlobal.player1 = true;

            myGlobal.players++;

            database.ref().set({
                player1: true,
                players: myGlobal.players
            });

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

        else if (myGlobals.players === 1 && !myGlobal.player2) {
            myGlobal.assignedRole = "Player 2";

            myGlobal.player2 = true;

            myGlobal.players++;

            database.ref().set({
                player2: true,
                players: myGlobal.players
            });

            greetPlayer("2");
        }

        else if (myGlobals.players === 1 && !myGlobal.player1) {
            myGlobal.assignedRole = "Player 1";

            myGlobal.player1 = true;

            myGlobal.players++;

            database.ref().set({
                player1: true,
                players: myGlobal.players
            });

            greetPlayer("1");
        }

        else {
            // do the modal thing
        };
    };
});

});