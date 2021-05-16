import { Inject, Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Tournament } from "../Entities/tournament.entity";
import { Player } from "../Entities/player.entity";
import { RoundRobin } from "../Algorithms/roundRobin";
import { BergerTable } from "../Algorithms/bergerTable";

@Service()
export class TournamentService {
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>;
    
    @InjectRepository(Player)
    private readonly playerRepository: Repository<Player>;
    
    public getTournaments = async () => {
        return await this.tournamentRepository.find({ relations: ["players"] });
    }

    public getTournament = async (id: string) => {
        return await this.tournamentRepository.findOne(id, { relations: ["players"] });
    }

    public createTournament = async (name: string) => {
        const tournament = new Tournament();
        tournament.name = name;
        await this.tournamentRepository.save(tournament);
        return tournament;
    }

    public deleteTournament = async (id: string) => {
        const tournament = await this.tournamentRepository.findOneOrFail(id, { relations: ["players"]});
        return await this.tournamentRepository.remove(tournament);
    }

    public addPlayer = async (tournamentId: string, name: string) => {
        const tournament = await this.tournamentRepository.findOneOrFail(tournamentId);
        const player = new Player();
        player.name = name;
        player.tournament = tournament;
        return await this.playerRepository.save(player);
    }

    public removePlayer = async (playerId: string) => {
        const player = await this.playerRepository.findOneOrFail(playerId);
        return await this.playerRepository.remove(player);
    }

    public generateTables = async (tournamentId: string) => {
        const players = await this.playerRepository.find({ where: { tournament: tournamentId } });
        const robinTables = RoundRobin(players);
        return robinTables;
    }

    public generateBergTables = async (tournamentId: string) => {
        const players = await this.playerRepository.find({ where: { tournament: tournamentId } });
        const bergTables = BergerTable(players);
        return bergTables;
    }
}