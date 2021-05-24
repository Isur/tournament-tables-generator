import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tournament } from "./tournament.entity";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public name: string;

    @ManyToOne(() => Tournament, tournament => tournament.players, { onDelete: 'CASCADE' })
    public tournament: Tournament;
}