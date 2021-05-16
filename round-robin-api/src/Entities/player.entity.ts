import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "./round.entity";
import { Tournament } from "./tournament.entity";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @ManyToOne(() => Tournament, tournament => tournament.players)
    public tournament: Tournament;

    @OneToMany(() => Round, round => round.tournament)
    public rounds: Round[];
}