import * as React from 'react';
import * as ReactDOM from 'react-dom';

class Start extends React.Component {
    render = () => (
        <h1>Hello</h1>
    )
}


ReactDOM.render(
    <Start />,
    document.getElementById('root')
)