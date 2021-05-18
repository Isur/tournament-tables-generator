import { Paper, TextField, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTournament } from '../redux/tournaments/actions';


const useStyles = makeStyles((theme: Theme) => createStyles({
       paper2: {
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           marginTop: '1em',
    }
   }));

const CreateTournament: FunctionComponent = () => {
    const classes = useStyles();
    const [name, setName] = useState<string>("");
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(createTournament(name));
        setName("");
    }
    return (
        <Paper elevation={0} className={classes.paper2}>
        <TextField value={name} onChange={(e) => setName(e.target.value)} label="Enter name..."/>
        {name &&
        <Button variant="outlined" color="primary" onClick={handleSave}> SAVE </Button>
        }
    </Paper>
    );
}

export default CreateTournament;