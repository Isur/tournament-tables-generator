import { AppBar, Tabs, Tab, Box, Typography, makeStyles, Theme, Button } from '@material-ui/core';
import React, { FunctionComponent, useState } from 'react';
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
    width: '80%',
    maxWidth: '1000px'
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

const Rounds: FunctionComponent<{ id: string }> = ({ id }) => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [rounds, setRounds] = useState<RoundsInt[]>([]);
  const tournament = useSelector((state: AppState) => state.tournament[id]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }

  const generateBerger = async () => {
    const result = await requestJson.get(`/tournaments/${id}/generate/berger`);
    setRounds(result.data.rounds);
    setValue(0);
  }

  return (
    <div className={classes.root}>
      {tournament?.players.length > 1 && (
        <>
          <Button variant="contained" color="primary" onClick={generateBerger}>
            Berger Tables
          </Button>
        </>
      )}
      {rounds.length > 0 && <>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable">
            {rounds.map((round, index) => <Tab key={index} label={`Round ${index + 1}`} {...a11yProps(index)} />)}
          </Tabs>
        </AppBar>
        {rounds.map((round, index) => <TabPanel key={index} value={value} index={index}>
          <Round pairs={round.pairs} />
        </TabPanel>)}
      </>}
    </div>
  );
}

export default Rounds;
