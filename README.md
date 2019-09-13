# Rock, Paper, Scissors Online

An online multiplayer version of the game Rock, Paper, Scissors.

Deployed application at https://ajdlm.github.io/rps-online/.

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

## How to Talk to Your Opponent

* When a user is assigned the role of either Player 1 or Player 2, a chat area will be displayed at the bottom of the page.

* There will be an input field at the bottom of this, into which the user may enter whatever they wish to communicate to their opponent.

* The user can send messages to their opponent either by clicking on the "Send" button or pressing ENTER while editing the input field.

* The text in the input field will be cleared away each time the user sends a message.

* When the number of messages overflows the amount of space the chat has for displaying them, the area will become scrollable so that it's possible to view all of the messages.

* When either user enters a new message, both users' chat areas will automatically scroll to the bottom so as to display this newest message (assuming that there are already enough displayed to overflow the chat).

* When a user leaves the game, all messages will be deleted from the database. They will continue to display for the other user (the one that stays), but they should not display for any new users joining the game. (Currently, this feature works only some of the time.)

## Bugs

1. There is code written in [game.js](assets/javascript/game.js) meant to reset the values of the variables in Firebase associated with a given player when their page unloads (when being refreshed, exited out of, etc.). This seems to be working better and better with each successive tweak, but it may still be possible for their variables' values to persist if there's something odd/unexpected about how they leave the page. Hopefully, this problem will prove to be solved now, but should it happen again, they will need to be edited manually or the game will not work properly.

2. The chat messages stored in the Firebase database aren't always deleted when a user leaves the game.
