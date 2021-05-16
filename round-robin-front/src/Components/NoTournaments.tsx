import React from 'react';
import {createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core';
import CreateTournament from './CreateTournament';

const useStyles = makeStyles((theme: Theme) => createStyles({
 root: {
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     width: '100%',
     height: '100%',
     padding: 0,
 },
 paper: {
     padding: "3em",
     display: 'flex',
     flexDirection: 'column',
     alignItems: 'center',
     justifyContent: 'center',
    },
}));

const NoTournaments = () => {

    const classes = useStyles()


    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant='h5'>
                    No existing tournament, create a new one!
                </Typography>
                <CreateTournament />
            </Paper>
        </div>
    );
}

export default NoTournaments;