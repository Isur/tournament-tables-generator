import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Player } from "./player.entity";

@Entity('tournaments')
export class Tournament {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @OneToMany(() => Player, players => players.tournament)
    public players: Player[];
}