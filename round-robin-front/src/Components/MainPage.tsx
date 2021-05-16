import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import NoTournaments from "./NoTournaments";
import Layout from "./Layout";
import TournamentList from "./TournamentList";

const MainPage = () => {
    const tournaments = useSelector((state: AppState) => state.tournament);

    if(!Object.keys(tournaments).length) {
        return (
            <Layout>
                <NoTournaments />
            </Layout>
            );
    }

    return (
        <Layout>
            <TournamentList />
        </Layout>
    )
}

export default MainPage;