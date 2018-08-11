import { JsonController, Get, Post, BodyParam, Param, Body, NotFoundError, BadRequestError, Patch } from "routing-controllers";
import Game from '../entities/game'
import { defaultBoard, randomColor, colors, moves } from "../lib/gameconfig";

@JsonController()
export default class GameController {


    @Get('/games')
    async getGames(){
        const games = await Game.find()
        console.log(games)
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

    @Patch('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) throw new NotFoundError(`Can't find gameboard!`)
        if (update.id && update.id !==id) throw new BadRequestError(`Invalid action, you're not allowed to change the ID.`)
        if (update.color && !colors.includes(update.color)) {
            throw new BadRequestError(`Invalid action, please choose one of these colors: red, blue, green, yellow or magenta`)
        }
        if (update.board && moves(update.board, game.board) > 1) {
            throw new BadRequestError(`Invalid action, you can only make one move per turn.`)
        }

        return Game.merge(game, update).save()
    }


}


