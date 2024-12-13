# TIC-TAC-TOE

Project for The Odin Project's Javascript course inside of the Full Stack React course.
The goal is to create the classic TIC TAC TOE game using HTML, CSS, and JavaScript.

Following best practices, the logic of the game should be created entirely before adding a UI.
The script file should avoid at all costs having any global variables.

## Pseudocode

    Function GameBoard
        A variable for the number of rows (3)
        A variable for the number of cells (3)
        Empty array for the game board.
        
        For loop that runs the value of rows.
            An empty array for each position in the board.
            For loop that runs the number of columns.
                Each time it pushes a cell inside of the row.

        Function getBoard that returns the game board.
        Function printBoard that logs the board in the console.

        Function Cell
            Variable value = 0
            Variable X
            Variable Y
            Function markCell that changes the value of the cell ONLY if it's different than 0 (hasn't been played)
            RETURN OBJ:
                X
                Y
                Value
                markCell

        Function placeToken
            Takes three parameters: X, Y, player
            Runs Cell.cell on the board.

        Function checkFull
            Variable available cells.
                Flattens the array and returns a new array with only the cells which value is 0
            If the length of the available cells is greater than 0
                Returns true
                Otherwise returns false

        Function checkWinner
            A series or if statements that checks if there are three cells in a row with the same value (other than 0)

        RETURN OBJ:
            getBoard
            placeToken
            printBoard
            checkFull


    Function Players
        Array with two players
            Each player is an object (constructor)
            Symbol is 1 and 2

        Variable activePlayer, is player one

        Function switch players
            If activePlayer is player 1, then it reassigns activePlayer to player 2

        RETURN OBJ:
            Active player
            Switch player


    Function GameFlow
        Variable board is GameBoard
        Variable players is Players

        Function announcePlayer
            Logs on the console which player's turn it is.

        Function play
            Takes two variables, x and y
            If there is no winner and the board isn't full
                Places a token on the board on x and y coordinates with the active player's symbol.
                Prints the board
                If boards' check winner is true
                    Announce the active player is the winner.
                Else if the board is full
                    Announce there's no winner and the game is over
                Else
                    Switches active player
                    Announces player's turn.

        Anonymous IIFE
            Starts the game by printing the board and announcing which player's turn it is.

        RETURN
            play


    IIFE UI
        IIFE Queries
            Returns all the needed queries
        
        Function render board
            Selects the board on the DOM and prints the cells.
            If the value of the cell is 1 it uses symbol X
            If the value of the cell is 2 it uses symbol O



    Variable game is GameFlow