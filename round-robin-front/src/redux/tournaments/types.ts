export interface Player {
    id: string,
    name: string,
}
export interface TournamentsState {
    [id: string]: {
        name: string,
        players: Player[],
    }
}
export interface GetTournaments extends TournamentsState {};
export type CreateTournament = {
    id: string,
    name: string,
};
export type RemoveTournament = string;
export type AddPlayer = {
    tournament: string,
    player: string,
    name: string,
};
export type RemovePlayer ={
    tournament: string,
    player: string,
};


