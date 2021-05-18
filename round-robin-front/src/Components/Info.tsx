import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Layout from "./Layout";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        width: '80%',
        maxHeight: '75%',
        overflow: 'auto',
        maxWidth: '1000px'
    }
}));

const Info = () => {
    const classes = useStyles();
    return (
        <Layout>
            <div className={classes.root}>
                <h3> Wstęp </h3> 
                <p> Round Robin, inaczej każdy z każdym - sposób rozgrywania turnieju gdzie każdy z zawodników (lub drużyn) gra z każdym. </p>
                <p> Liczba gier rozgrywana w ramach turnieju wynosi  </p> 
                <img src='/assets/graczy.png' alt="liczba graczy"/>
                <p> Gdzie N oznacza liczbę graczy. </p>
                <p> 
                    Jedną z metod generowania tabel turniejowych jest metoda opracowana przez austriackiego teoretyka szachowego - Johana Bergera.
                    Jego metoda zapewnia optymalną liczbę parti granych białymi i czarnymi figurami w szachach.
                </p>
                <p> Jeśli liczba graczy jest nie parzysta, to jeden z graczy w każdej kolejce pauzuje. </p>
                <h3> Sposób tworzenia tabeli </h3>
                <p> Jeśli liczba graczy jest nieparzysta, dopisuje się jednego 'oczekującego'. </p>
                <p> Liczba rund to N - 1. </p>
                <p> Liczba gier w danej rundzie to N / 2.</p>
                <p> Sposób dobierania par zaprezentowany na poniższym schemacie: </p> 
                <img style={{ width: '256px', maxWidth:'50%' }} src="/assets/schedule.png" alt="Rotacja" />
                <p> 
                    Gracze pierwzej kolejki są zaznaczeni.
                    Wygenerowanie kolejnej kolejki polega na obróceniu tarczy o jeden element N / 2 razy.
                    W powyższym przykładzie, dla 14 graczy obracamy tarcze 7 razy.
                    Ostatni gracz, który jest wyznaczony jako element środkowy obracanej tarczy, jest na zmiane na pozycji białej i czarnej.
                </p>
                <h3> Przykład dla 6 graczy </h3>
                <table style={{ border: '1px solid black' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid black' }}> Runda </th>
                            <th style={{ border: '1px solid black' }}>  Gra 1 </th>
                            <th style={{ border: '1px solid black' }}>  Gra 2 </th>
                            <th style={{ border: '1px solid black' }}>  Gra 3 </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td> 1. </td>
                            <td> 1-6 </td>
                            <td> 2-5 </td>
                            <td> 3-4 </td>
                        </tr>
                        <tr>
                            <td> 2. </td>
                            <td> 6-4 </td>
                            <td> 5-3 </td>
                            <td> 1-2 </td>
                        </tr>
                        <tr>
                            <td> 3. </td>
                            <td> 2-6 </td>
                            <td> 3-1 </td>
                            <td> 4-5 </td>
                        </tr>
                        <tr>
                            <td> 4. </td>
                            <td> 6-5 </td>
                            <td> 1-4 </td>
                            <td> 2-3 </td>
                        </tr>
                        <tr>
                            <td> 5. </td>
                            <td> 3-6 </td>
                            <td> 4-2 </td>
                            <td> 5-1 </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}

export default Info;