import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { ClientRoot } from './game/game-setup';
import { ROUTES } from './routes';
import { Create } from './monitor';
import { Root } from './root';

const Start = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path={ROUTES.MONITOR}>
                    <Create />
                </Route>
                <Route path={ROUTES.SETUP}>
                    <ClientRoot />
                </Route>
                <Route path={ROUTES.ROOT}>
                    <Root />
                </Route>
            </Switch>
        </BrowserRouter>
    );
};


ReactDOM.render(
    <Start />,
    document.getElementById('root')
);