import { createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Info from './Components/Info';
import MainPage from './Components/MainPage';
import Players from './Components/Players';
import { getTournaments } from './redux/tournaments/actions';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      width: '100%',
    },
    title: {
      flexGrow: 1,
    },
  }),
);

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTournaments());
  });

  return (
    <div className={classes.root}>
      <Switch>
          <Route exact path="/info" render={() => <Info />} />
          <Route exact path="/:id" render={() => <Players />} />
          <Route path="*" render={() => <MainPage />} />
        </Switch>
    </div>
  );
}

export default App;
