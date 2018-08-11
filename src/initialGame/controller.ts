import { JsonController, Get, Post, BodyParam, Put, Param, Body, NotFoundError } from "routing-controllers";
import Game from './entity'
import { defaultBoard, randomColor } from "../lib/gameconfig";

@JsonController()
export default class GameController {


    @Get('/games')
    async getGames(){
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    newGame(
        @BodyParam('name', {required: true}) name: string
    ) {
        const game = new Game()
        game.name = name
        game.board = JSON.parse(JSON.stringify(defaultBoard))
        game.color = randomColor()
        return game.save()
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError(`Can't find gameboard!`)

        return Game.merge(game, update).save()
    }


}


// These are the steps to create a basic backend (API-only):

// 1. Create a `games` table with model using TypeORM. A game should have an `id`, a `name`, a `color` and `board` field. 
// Both the name and color fields are `text` fields, the board field is of type `json`.  



// 2. Setup a webserver using routing-controllers and create a `GET /games` endpoint that returns all the games (with envelope!)


// 3. Add an endpoint `POST /games` for which the only input is a name. The created game should receive a random color out of these 
// colors: red, blue, green, yellow, magenta. So every new game that gets created is assigned a random color. 


// 4. Add an endpoint `PUT /games/:id` or `PATCH /games/:id` that allows to overwrite one or more fields of the game. 
// E.g. calling `PUT /games` with JSON body `{ "name": "new name" }` should update the name, same for color and board (not for id). 


// 5. When a **game is changed** using the endpoint you made in #4 and the color field is updated, make sure (validate) 
// that the color is one of these colors: red, blue, green, yellow, magenta


// 6. When a **game starts**, your app should set the board to an empty board. The board is a two dimensional array that 
// contains three arrays with three times the letter 'o'. (see code below\*)


// 7. When a **game is changed** and the board field is updated, make sure only 1 move is made per request. That means 
// that only one element out of the 9 can be changed into something else. You can use the function below to count the number of moves between two boards.


//  If somebody tries to make more moves, return a `HTTP 400 Bad Request` response. If everything is fine, update the board field of the game.  \*\* 

// When the `board` is returned by the API it should be an array of arrays (not a string of JSON). Also for input, the `board` field should also be an array, not a string of JSON. 


// \* the start position of the board in code:

// ```js
// const defaultBoard = [
// 	['o', 'o', 'o'],
// 	['o', 'o', 'o'],
// 	['o', 'o', 'o']
// ]
// ``` 

// \*\* a function that returns the number of changes between boards

// ```js
// const moves = (board1, board2) => 
//   board1
//     .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
//     .reduce((a, b) => a.concat(b))
//     .length
// ```