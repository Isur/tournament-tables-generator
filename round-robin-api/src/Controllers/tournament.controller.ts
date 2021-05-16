import { Body, Delete, Get, JsonController, Param, Patch, Post, Req } from "routing-controllers";
import { TournamentService } from "../Services/tournaments.service";
import { Inject, Service } from "typedi";

@Service()
@JsonController('/tournaments')
export class TournamentController {
    @Inject()
    private readonly tournamentService: TournamentService;

    @Get('/')
    getAll() {
        return this.tournamentService.getTournaments();
    }

    @Get('/:id')
    getOne(@Param('id') id: string) {
        return this.tournamentService.getTournament(id);
    }

    @Get('/:id/generate/circle')
    generateTables(@Param('id') id: string) {
        return this.tournamentService.generateTables(id);
    }

    @Get("/:id/generate/berger")
    generateBergTables(@Param('id') id: string) {
        return this.tournamentService.generateBergTables(id);
    }

    @Post('/')
    create(@Body({ required: true }) body: { name: string }) {
        const { name } = body;
        return this.tournamentService.createTournament(name);
    }

    @Delete('/:id')
    deleteOne(@Param('id') id: string) {
        return this.tournamentService.deleteTournament(id);
    }

    @Patch('/:id/removePlayer')
    removePlayer(@Param('id') id: string, @Body({ required: true }) body: { player: string }) {
        const { player } = body;
        return this.tournamentService.removePlayer(player);
    }

    @Patch('/:id/addPlayer')
    addPlayer(@Param('id') id: string, @Body({ required: true }) body: { player: string }) {
        const { player } = body;
        return this.tournamentService.addPlayer(id, player);
    }
}