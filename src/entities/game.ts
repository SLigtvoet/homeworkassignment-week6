import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, IsIn, MinLength, MaxLength, ArrayMinSize, ArrayMaxSize } from "class-validator";
import { colors } from "../lib/gameLogic";

@Entity()
export default class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable: false})
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    name: string

    @IsIn(colors)
    @IsString()
    @Column('text', {nullable: false})
    color: string = colors[Math.floor(Math.random() * 5)]

    @ArrayMinSize(3)
    @ArrayMaxSize(3)
    @Column('simple-json', {nullable: false})
    board: Array<Array<string>> = [
        ['o', 'o', 'o'],
        ['o', 'o', 'o'],
        ['o', 'o', 'o']
    ]
}
