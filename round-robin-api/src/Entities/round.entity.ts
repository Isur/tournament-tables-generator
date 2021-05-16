import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Player } from "./player.entity";
import { Tournament } from "./tournament.entity";

@Entity('rounds')
@Unique(['white', 'black', 'round', 'tournament'])
export class Round {
    @PrimaryGeneratedColumn('increment')
    public id: number;

    @Column()
    public round: number;

    @ManyToOne(() => Tournament, tournament => tournament.rounds)
    public tournament: Tournament;

    @ManyToOne(() => Player, player => player.rounds)
    public white: string;

    @ManyToOne(() => Player, player => player.rounds, { nullable: true })
    public black: string;

    @Column()
    public result: "white" | "black" | "pat";
}