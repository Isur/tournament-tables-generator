import { createStyles, IconButton, Link, List, ListItem, makeStyles, Theme, Typography } from '@material-ui/core';
import { DeleteForever } from "@material-ui/icons";
import React, { FunctionComponent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from "react-router-dom";
import { AppState } from '../redux/store';
import { removeTournament } from '../redux/tournaments/actions';
import CreateTournament from './CreateTournament';

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


const TournamentList: FunctionComponent = () => {
    const classes = useStyles();
    const tournaments = useSelector((state: AppState) => state.tournament);
    const dispatch = useDispatch();
    const t = Object.keys(tournaments);
    const handleDeleteTournament = (id: string) => {
      dispatch(removeTournament(id));
    }
    return (
        <div className={classes.root}>
                <List className={classes.listRoot} subheader={
                    <Typography variant="h6">
                     Tournament List
                    </Typography>
                }>
                    
                    {t.map(key => {
                        return <ListItem button key={key}> <IconButton onClick={() => handleDeleteTournament(key)}> <DeleteForever color="error" /> </IconButton> <Link component={RouterLink} to={`/${key}`}>{tournaments[key].name}</Link> </ListItem>
                    })}
                </List>
                <CreateTournament />
        </div>
    )
}

export default TournamentList;