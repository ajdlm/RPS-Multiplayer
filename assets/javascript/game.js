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
        players: 2,
        player1: true,
        player2: false,
        player1Choice: "",
        player2Choice: "",
        player1Chosen: false,
        player2Chosen: false,
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

    function setToGlobal() {
        database.ref().update({
            player1: myGlobal.player1,
            player2: myGlobal.player2,
            player1Choice: myGlobal.player1Choice,
            player2Choice: myGlobal.player2Choice,
            player1Chosen: myGlobal.player1Chosen,
            player2Chosen: myGlobal.player2Chosen,
            players: myGlobal.players
        });
    };

    function getReady() {
        var countDown = 5;

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
        $("#start-div").addClass("d-none");

        $("#wait-div").empty().removeClass("d-none");

        var letsStartText = $("<h2>");

        letsStartText.text("Welcome to the game, Player " + x + "!")

        $("#wait-div").append(letsStartText);

        setTimeout(getReady, 1000);
    };

    function rpsShoot() {
        if (player1Choice === player2Choice) {
            //tie
        }

        else if ((player1Choice === "rock" && player2Choice === "scissors") || (player1Choice === "paper" && player2Choice === "rock") || (player1Choice === "scissors" && player2Choice === "paper")) {
            //player 1 wins
        }

        else {
            //player 2 wins
        };
    };

    database.ref().on("value", function (snapshot) {
        console.log(myGlobal);

        myGlobal.players = snapshot.val().players;

        myGlobal.player1 = snapshot.val().player1;

        myGlobal.player2 = snapshot.val().player2;

        myGlobal.player1Choice = snapshot.val().player1Choice;

        myGlobal.player2Choice = snapshot.val().player2Choice;

        myGlobal.player1Chosen = snapshot.val().player1Chosen;

        myGlobal.player2Chosen = snapshot.val().player2Chosen;

        if ((myGlobal.waitingForOpponent) && ((myGlobal.player1) && (myGlobal.player2))) {
            myGlobal.waitingForOpponent = false;

            getReady();
        };

        if ((player1Chosen) && (player2Chosen)) {
            rpsShoot();
        };

        console.log(snapshot.val());

        console.log(myGlobal);
    });

    $(window).on("unload", function () {
        if (myGlobal.assignedRole === "Player 1") {
            myGlobal.players--;

            myGlobal.player1 = false;

            setToGlobal();
        }

        else if (myGlobal.assignedRole === "Player 2") {
            myGlobal.players--;

            myGlobal.player2 = false;

            setToGlobal();
        };
    });

    $("#start-button").on("click", function (event) {
        if (myGlobal.players === 0 && !myGlobal.player1) {
            myGlobal.assignedRole = "Player 1";

            myGlobal.player1 = true;

            myGlobal.players++;

            setToGlobal();

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

        else if (myGlobal.players === 1 && !myGlobal.player2) {
            myGlobal.assignedRole = "Player 2";

            myGlobal.player2 = true;

            myGlobal.players++;

            setToGlobal();

            greetPlayer("2");
        }

        else if (myGlobal.players === 1 && !myGlobal.player1) {
            myGlobal.assignedRole = "Player 1";

            myGlobal.player1 = true;

            myGlobal.players++;

            setToGlobal();

            greetPlayer("1");
        }

        else {
            $("#cant-play-modal").modal("show");
        };
    });

    $("#rock-button").on("click", function () {
        if (assignedRole === "Player 1") {
            myGlobal.player1Choice = "rock";
            myGlobal.player1Chosen = true;
            setToGlobal();
        }
        
        else if (assignedRole === "Player 2") {
            myGlobal.player2Choice = "rock";
            myGlobal.player2Chosen = true;
            setToGlobal();
        };
    });

    $("#paper-button").on("click", function () {
        if (assignedRole === "Player 1") {
            myGlobal.player1Choice = "paper";
            myGlobal.player1Chosen = true;
            setToGlobal();
        }
        
        else if (assignedRole === "Player 2") {
            myGlobal.player2Choice = "paper";
            myGlobal.player2Chosen = true;
            setToGlobal();
        };
    });

    $("#rock-button").on("click", function () {
        if (assignedRole === "Player 1") {
            myGlobal.player1Choice = "scissors";
            myGlobal.player1Chosen = true;
            setToGlobal();
        }
        
        else if (assignedRole === "Player 2") {
            myGlobal.player2Choice = "scissors";
            myGlobal.player2Chosen = true;
            setToGlobal();
        };
    });
});