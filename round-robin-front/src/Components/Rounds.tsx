import { AppBar, Tabs, Tab, Box, Typography, makeStyles, Theme, Button } from '@material-ui/core';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../redux/store';
import { requestJson } from '../Utils/request.json';
import Round from './Round';

const TabPanel: FunctionComponent<{ value: number, index: number }> = ({ value, index, children, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  interface RoundsInt {
    pairs: {
        white: { id: string, name: string },
        black: { id: string, name: string },
    }[]
  };

const Rounds: FunctionComponent<{id: string}> = ({ id }) => {
    const classes = useStyles();
    const [value, setValue] = useState(1);
    const [rounds, setRounds] = useState<RoundsInt[]>([]);
    const tournament = useSelector((state: AppState) => state.tournament[id]);
    
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    }

    useEffect(() => {
        // generate();        setRounds([]);
    }, [tournament?.players]);

    const generate = async () => {
        const result = await requestJson.get(`/tournaments/${id}/generate/circle`);
        setRounds(result.data.rounds);
    }
    
    const generateBerger = async () => {
      const result = await requestJson.get(`/tournaments/${id}/generate/berger`);
      setRounds(result.data.rounds);
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange}>
                    {rounds.map((round, index) => <Tab key={index} label={`Round ${index}`} {...a11yProps(index)} /> )}
                </Tabs>
            </AppBar>
            {rounds.map((round, index) => <TabPanel key={index} value={value} index={index}>
                <Round pairs={round.pairs} />
            </TabPanel>)}
            

            <Button variant="contained" color="primary" onClick={generate}>
                Generate Tables
            </Button>
            <Button variant="contained" color="primary" onClick={generateBerger}>
                Berger Tables
            </Button>
        </div>
    );
}

export default Rounds;
