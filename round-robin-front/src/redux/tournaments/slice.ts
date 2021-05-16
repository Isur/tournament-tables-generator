import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddPlayer, CreateTournament, RemoveTournament, RemovePlayer, TournamentsState, GetTournaments } from "./types";

const initialState: TournamentsState = { }

export const counterSlice = createSlice({
    name: "tournaments",
    initialState,
    reducers: {
        get: (state, action: PayloadAction<GetTournaments>) => {
            for(const t in action.payload) {
                state[t] = {
                    name: action.payload[t].name,
                    players: action.payload[t].players,
                }
            }
        },
        create: (state, action: PayloadAction<CreateTournament>) => {
            state[action.payload.id] = {
                name: action.payload.name,
                players: [],
            }
        },
        remove: (state, action: PayloadAction<RemoveTournament>) => {
            delete state[action.payload];
        },
        addPlayer: (state, action: PayloadAction<AddPlayer>) => {
            const { player, tournament, name } = action.payload;
            state[tournament].players.push({
                id: player,
                name: name,
            });
        },
        removePlayer: (state, action: PayloadAction<RemovePlayer>) => {
            const { player, tournament } = action.payload;
            state[tournament].players = state[tournament].players.filter(item => item.id !== player);
        },
    }
});

export const { create, remove, addPlayer, removePlayer, get } = counterSlice.actions;

export default counterSlice.reducer;