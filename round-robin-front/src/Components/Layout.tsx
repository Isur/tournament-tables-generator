import { AppBar, Toolbar, Typography, Button, createStyles, makeStyles, Theme } from '@material-ui/core';
import React, { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        height: '100vh',
        width: '100%',
        '& .content' : {
            position: "fixed",
            height: '100%',
            width: '100%',
        }
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Layout: FunctionComponent = ({ children }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="relative">
                <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    Round Robin
                </Typography>
                <Button color="inherit">
                    Info
                </Button>
                <Button color="inherit" component={Link} to="/">
                    Tournaments
                </Button>
                </Toolbar>
            </AppBar>
            <div className="content">
                {children}
            </div>
        </div>
    )
}

export default Layout;