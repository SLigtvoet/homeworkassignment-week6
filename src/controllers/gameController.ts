import { JsonController, Get, Post, BodyParam, Param, Body, NotFoundError, BadRequestError, Patch } from "routing-controllers";
import Game from '../entities/game'
import { moves } from "../lib/gameLogic";
import {validate} from "class-validator";

@JsonController()
export default class GameController {

    @Get('/games')
    async getGames(){
        const games = await Game.find()
        return { games }
    }

    @Post('/games')
    async newGame(
        @BodyParam('name', {required: true}) name: string
    ) {
        const game = Game.create({name: name})
        const errors = await validate(game);
        if (errors.length > 0) {
            throw errors[0]
        }
        return game.save()
    }

    @Patch('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) {
            throw new NotFoundError(`Can't find gameboard!`)
        }
        if (update.id && update.id !==id) {
            throw new BadRequestError(`Invalid action, you're not allowed to change the ID.`)
        }
        if (update.board && update.board.length === 3 && moves(game.board, update.board) > 1) {
            throw new BadRequestError(`Invalid action, you can only make one move per turn.`)
        }
        if (update.board && update.board.reduce((acc, val) => acc.concat(val), []).filter((val : string) => (val !== 'x' && val !== 'o')).length > 0){
            throw new BadRequestError(`Invalid board`)
        }
        const updatedGame = Game.merge(game, update)
        const errors = await validate(updatedGame);
        if (errors.length > 0) {
            throw new BadRequestError('Invalid input')
        }
        return updatedGame.save()
    }
}


