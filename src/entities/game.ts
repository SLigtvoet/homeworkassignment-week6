import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { IsString, IsJSON } from "class-validator";

@Entity()
export default class Game extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable: false})
    @IsString()
    name: string

    @IsString()
    @Column('text', {nullable: false})
    color: string

    @IsJSON()
    @Column('simple-json', {nullable: false})
    board: JSON
}