import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ROUTES } from '../routes';

const Wrapper = (props: any) =>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
    }}>
        {props.children}
    </div>;


const InnerWrapper = (props: any) =>
    <div style={{
        display: 'flex',
        width: '300px',
        alignContent: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
    }}>
        {props.children}
    </div>;

export const Root = () => {
    let id = '';
    const history = useHistory();

    const setId = (val: string) => {
        id = val;

        if (id.length === 4) {
            const route = ROUTES.GAME.replace(':id', id);
            history.push(route);
        }
    }

    return (
        <Wrapper>
            <InnerWrapper>
                <div>
                    <input type={"text"} onChange={e => setId(e.currentTarget.value)} />
                </div>
                <Link to={ROUTES.MONITOR}>
                    Host new quiz
                </Link>
            </InnerWrapper>
        </Wrapper>
    );
}