import * as React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../routes';

export const Root = () => {
    return (
        <div>
            <Link to={ROUTES.SETUP.replace(':id', 'ASDF')}>Eyy</Link>
        </div>
    );
}