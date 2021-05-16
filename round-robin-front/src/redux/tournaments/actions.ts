import { Dispatch } from "@reduxjs/toolkit";
import { requestJson } from "../../Utils/request.json";
import { create, remove, addPlayer, removePlayer, get } from "./slice";
import { AddPlayer, RemovePlayer } from "./types";

export const createTournament = (name: string) => async (dispatch: Dispatch) => {
    const response = await requestJson.post('tournaments', { name: name });
    const tournament = response.data;
    dispatch(create({ 
        id: tournament.id,
        name: tournament.name,
    }));
}

export const removeTournament = (id: string) => async (dispatch: Dispatch) => {
    await requestJson.delete('tournaments/' + id);
    dispatch(remove(id));
}

export const addPlayerToTournament = (options: Partial<AddPlayer>) => async (dispatch: Dispatch) => {
    const response = await requestJson.patch('tournaments/' + options.tournament + "/addPlayer", { 
        player: options.name
    });

    dispatch(addPlayer({
        player: response.data.id,
        tournament: response.data.tournament.id,
        name: response.data.name
    }));
}

export const removePlayerFromTournament = (options: RemovePlayer) => async (dispatch: Dispatch) => {
    await requestJson.patch('tournaments/' + options.tournament + "/removePlayer", { player: options.player });
    dispatch(removePlayer(options));
}

export const getTournaments = () => async (dispatch: Dispatch) => {
    const response = await requestJson.get('tournaments');
    console.log(" THIS IS SOME AWESOME TEST");
    const tournaments = response.data.reduce((prev: any, curr: any) => {
        prev[curr.id] = {
            name: curr.name,
            players: curr.players.map((p: any) => ({ name: p.name, id: p.id })),
        };
        return prev;
    }, {});
    dispatch(get(tournaments));
}