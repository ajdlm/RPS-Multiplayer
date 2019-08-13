$(document).ready(function () {
    console.log("Wowzers!");

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
        player1Choice: "",
        player2Choice: "",
        player1Chosen: false,
        player2Chosen: false,
        player1Wins: 0,
        player2Wins: 0,
        player1Losses: 0,
        player2Losses: 0,
        assignedRole: "not a player",
        waitingForOpponent: false
    }

    function startGame() {
        $("#start-div").addClass("d-none");

        $("#wait-div").empty();

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
            if (myGlobal.assignedRole === "Player 1") {
                myGlobal.player1Chosen = false;
            }

            else {
                myGlobal.player2Chosen = false;
            };

            setToGlobal();

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
            player1Wins: myGlobal.player1Wins,
            player2Wins: myGlobal.player2Wins,
            player1Losses: myGlobal.player1Losses,
            player2Losses: myGlobal.player2Losses,
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

        $("#wait-div").empty();

        var letsStartText = $("<h2>");

        letsStartText.text("Welcome to the game, Player " + x + "!")

        $("#wait-div").append(letsStartText);

        setTimeout(getReady, 1000);
    };

    function itsATie() {
        $("#wait-div").empty();

        var tieText = $("<h2>");

        tieText.text("It's a tie!")

        $("#wait-div").append(tieText);

        setTimeout(getReady, 1000);
    }

    function youWin() {
        $("#wait-div").empty();

        var winText = $("<h2>");

        var wins = $("<h2>");

        var losses = $("<h2>");

        if (myGlobal.assignedRole === "Player 1") {
            winText.text(myGlobal.player1Choice + " beats " + myGlobal.player2Choice.toLowerCase() + "! You win!")

            wins.text("Wins: " + myGlobal.player1Wins);

            losses.text("Losses: " + myGlobal.player1Losses);
        }

        else {
            winText.text(myGlobal.player2Choice + " beats " + myGlobal.player1Choice.toLowerCase() + "! You win!")

            wins.text("Wins: " + myGlobal.player2Wins);

            losses.text("Losses: " + myGlobal.player2Losses);
        };

        $("#wait-div").append(winText, "<br />", wins, "<br />", losses);

        setTimeout(getReady, 2000);
    };

    function youLose() {
        $("#wait-div").empty();

        var loseText = $("<h2>");

        var wins = $("<h2>");

        var losses = $("<h2>");

        if (myGlobal.assignedRole === "Player 1") {
            loseText.text(myGlobal.player2Choice + " beats " + myGlobal.player1Choice.toLowerCase() + ". You lose.");

            wins.text("Wins: " + myGlobal.player1Wins);

            losses.text("Losses: " + myGlobal.player1Losses);
        }

        else {
            loseText.text(myGlobal.player1Choice + " beats " + myGlobal.player2Choice.toLowerCase() + ". You lose.");

            wins.text("Wins: " + myGlobal.player2Wins);

            losses.text("Losses: " + myGlobal.player2Losses);
        };

        $("#wait-div").append(loseText, "<br />", wins, "<br />", losses);

        setTimeout(getReady, 2000);
    };

    function rpsShoot() {
        $("#game-div").addClass("d-none");

        if (myGlobal.player1Choice === myGlobal.player2Choice) {
            itsATie();
        }

        else if (((myGlobal.player1Choice === "Rock") && (myGlobal.player2Choice === "Scissors")) || ((myGlobal.player1Choice === "Paper") && (myGlobal.player2Choice === "Rock")) || ((myGlobal.player1Choice === "Scissors") && (myGlobal.player2Choice === "Paper"))) {
            if (myGlobal.assignedRole === "Player 1") {
                myGlobal.player1Wins++;

                //database.ref().update({ player1Wins: myGlobal.player1Wins });

                youWin();
            }

            else {
                myGlobal.player1Losses++;

                //database.ref().update({ player1Losses: myGlobal.player1Losses });

                youLose();
            };
        }

        else {
            if (myGlobal.assignedRole === "Player 2") {
                myGlobal.player2Wins++;

                //database.ref().update({ player2Wins: myGlobal.player2Wins });

                youWin();
            }

            else {
                myGlobal.player2Losses++;

                //database.ref().update({ player2Losses: myGlobal.player2Losses });

                youLose();
            };
        };
    };

    function choiceMade() {
        if ((myGlobal.player1Chosen) && (myGlobal.player2Chosen)) {
            console.log("lalala");
            rpsShoot();
        }

        else {
            $("#game-div").addClass("d-none");

            var waitText = $("<h2>");

            waitText.text("Waiting on opponent's choice...")

            var waitGif = $("<img>");

            waitGif.attr("src", "assets/images/loader.gif");

            $("#wait-div").append(waitGif, waitText);
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

        myGlobal.player1Wins = snapshot.val().player1Wins;

        myGlobal.player2Wins = snapshot.val().player2Wins;

        myGlobal.player1Losses = snapshot.val().player1Losses;

        myGlobal.player2Losses = snapshot.val().player2Losses;

        if ((myGlobal.waitingForOpponent) && ((myGlobal.player1) && (myGlobal.player2))) {
            myGlobal.waitingForOpponent = false;

            getReady();
        };

        if ((myGlobal.player1Chosen) && (myGlobal.player2Chosen)) {
            rpsShoot();
        };

        console.log(snapshot.val());

        console.log(myGlobal);
    });

    $(window).on("unload", function () {
        if (myGlobal.assignedRole === "Player 1") {
            myGlobal.players--;

            myGlobal.player1 = false;

            myGlobal.player1Choice = "";

            myGlobal.player1Chosen = false;

            myGlobal.player1Wins = 0;

            myGlobal.player1Losses = 0;

            setToGlobal();
        }

        else if (myGlobal.assignedRole === "Player 2") {
            myGlobal.players--;

            myGlobal.player2 = false;

            myGlobal.player2Choice = "";

            myGlobal.player2Chosen = false;

            myGlobal.player2Wins = 0;

            myGlobal.player2Losses = 0;

            setToGlobal();
        };
    });

    $("#start-button").on("click", function (event) {
        if ((myGlobal.players === 0) && (!myGlobal.player1)) {
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

            $("#wait-div").append(greetingText, loaderGif, waitText);
        }

        else if ((myGlobal.players === 1) && (!myGlobal.player2)) {
            myGlobal.assignedRole = "Player 2";

            myGlobal.player2 = true;

            myGlobal.players++;

            setToGlobal();

            greetPlayer("2");
        }

        else if ((myGlobal.players) === 1 && (!myGlobal.player1)) {
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
        if (myGlobal.assignedRole === "Player 1") {
            myGlobal.player1Choice = "Rock";
            myGlobal.player1Chosen = true;
            setToGlobal();
            choiceMade();
        }

        else if (myGlobal.assignedRole === "Player 2") {
            myGlobal.player2Choice = "Rock";
            myGlobal.player2Chosen = true;
            setToGlobal();
            choiceMade();
        };
    });

    $("#paper-button").on("click", function () {
        if (myGlobal.assignedRole === "Player 1") {
            myGlobal.player1Choice = "Paper";
            myGlobal.player1Chosen = true;
            setToGlobal();
            choiceMade();
        }

        else if (myGlobal.assignedRole === "Player 2") {
            myGlobal.player2Choice = "Paper";
            myGlobal.player2Chosen = true;
            setToGlobal();
            choiceMade();
        };
    });

    $("#scissors-button").on("click", function () {
        if (myGlobal.assignedRole === "Player 1") {
            myGlobal.player1Choice = "Scissors";
            myGlobal.player1Chosen = true;
            setToGlobal();
            choiceMade();
        }

        else if (myGlobal.assignedRole === "Player 2") {
            myGlobal.player2Choice = "Scissors";
            myGlobal.player2Chosen = true;
            setToGlobal();
            choiceMade();
        };
    });
});