# Rock, Paper, Scissors Online

An online multiplayer version of the game Rock, Paper, Scissors.

## How to Start

* When the user loads the page, a single button reading "JOIN GAME" is displayed.

* If the user clicks on this button, the page checks to see if there is a Player 1. If there isn't, it makes them Player 1.

* If there already is a Player 1, it checks to see if there is a Player 2.

* If there isn't, it makes them Player 2, then starts the game.

* If the user is assigned the role of Player 1, but there's no Player 2, they will be shown the following [loader](assets/images/loader.gif) and informed that the game is waiting for an opponent to show up.

* Whatever the case may be, as soon as there is both a Player 1 and a Player 2, the game will start.

* If a user clicks on the "JOIN GAME" button, but there is already both a Player 1 and a Player 2, a Bootstrap modal will be displayed to inform them that the game is already full.

## How to Play

* First, a series of h2 elements will display, each replacing the last after a second elapses. Taken together, they will read, "Rock... Paper... Scissors... Shoot!"

* Then, three images will display -- one of a rock, one of a paper, and one of some scissors. To choose either rock, paper, or scissors, the user must click on the corresponding image.

* The first user to choose will be shown the same loader gif as previously and informed that the page is waiting on their opponent's choice.

* Once both users have chosen, the page will stop displaying the images and instead show h2 text informing them of whether they've won, lost, or tied.

* If they've won or lost, the page will also display the cumulative numbers of wins and losses that they've had so far.

* After that, the process will begin again, starting with the display of the h2 elements reading "Rock... Paper... Scissors... Shoot!"

* If either of the users leaves the page at any point, the other one will have to wait for a new opponent to continue.

* When they finally do receive a new opponent, their record of wins and losses will persist from before, but the new player will start with a value of 0 for each.

## Still to Do

* I still need to finish a chat area in which both players can type and enter messages in order to communicate with each other.

## Bugs

* There is code written in [game.js](assets/javascript/game.js) meant to reset the values of the variables in Firebase associated with a given player when their page unloads (when being refreshed, exited out of, etc.).

For the most part, this works, but it may still be possible for their variables' values to persist if there's something odd/unexpected about how they leave the page. Should this happen again, they will need to be edited manually or the game will not work properly.