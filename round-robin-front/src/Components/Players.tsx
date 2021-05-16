import { createStyles, IconButton, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AppState } from '../redux/store';
import { removePlayerFromTournament } from '../redux/tournaments/actions';
import CreatePlayer from './CreatePlayer';
import Layout from './Layout';
import Rounds from './Rounds';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      },
    listRoot: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

const Players: FunctionComponent = () => {
    const { id } = useParams<{ id: string }>();
    const tournament = useSelector((state: AppState) => state.tournament[id]);
    const classes = useStyles();
    const dispatch = useDispatch()
    
    const handleDeletePlayer = (playerId: string) => {
      dispatch(removePlayerFromTournament({ player: playerId, tournament: id }));
    }
    
    return (
        <Layout>
            <div className={classes.root}>
                <List className={classes.listRoot} subheader={
                    <Typography variant="h6">
                     Player List
                    </Typography>
                }>
                    {tournament?.players.map(player => {
                        return <ListItem button key={player.id}> <IconButton onClick={() => handleDeletePlayer(player.id)}> <DeleteForever color="error" /> </IconButton> {player.name} </ListItem>
                    })}
                    <CreatePlayer tournament={id} />
                </List>
                <Rounds id={id} />
            </div>
        </Layout>
    );
}

export default Players;