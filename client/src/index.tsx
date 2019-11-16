import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { ClientRoot } from './game/game-setup';
import { ROUTES } from './routes';
import { Create } from './monitor';
import { Root } from './root';
import { Lobby } from './monitor/lobby';

const Start = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path={ROUTES.MONITOR}>
                    <Create />
                </Route>
                <Route exact path={ROUTES.GAME}>
                    <ClientRoot />
                </Route>
                <Route exact path={ROUTES.ROOT}>
                    <Root />
                </Route>
                <Route exact path={ROUTES.MONITOR_GAME}>
                    <Lobby />
                </Route>
                <Route path={'*'}>
                    404
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


ReactDOM.render(
    <Start />,
    document.getElementById('root')
);