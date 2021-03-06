import { Paper, TextField, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FunctionComponent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayerToTournament } from '../redux/tournaments/actions';


const useStyles = makeStyles((theme: Theme) => createStyles({
       paper2: {
           display: 'flex',
           justifyContent: 'center',
           alignItems: 'center',
           marginTop: '1em',
    }
   }));

const CreateTournament: FunctionComponent<{tournament: string}> = ({ tournament }) => {
    const classes = useStyles();
    const refInput = useRef<any>(null);
    const [name, setName] = useState<string>("");
    const dispatch = useDispatch();
    const handleSave = () => {
        dispatch(addPlayerToTournament({ name, tournament }));
        setName("");
        refInput.current.focus();
    }
    const handleKeyPress = (e: any) => {
        if(e.charCode === 13) {
            handleSave();
        }
    }
    return (
        <Paper elevation={0} className={classes.paper2}>
        <TextField onKeyPress={handleKeyPress} inputRef={refInput} value={name} onChange={(e) => setName(e.target.value)} label="Enter player name..."/>
        {name &&
        <Button variant="outlined" color="primary" onClick={handleSave}> SAVE </Button>
        }
    </Paper>
    );
}

export default CreateTournament;