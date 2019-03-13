import React from 'react';
import { connect } from 'react-redux';

class Regards extends React.Component {
    
    sayHello = () => {
        // this.props.dispatch({ type: 'SAY_HELLO' });
        this.props.globalEventDistributor.dispatch({ type: 'SAY_HELLO' });
    };

    sayHelloFromTheOtherSide = () => {
        // this.props.dispatch({ type: 'HELLO_FROM_THE_OTHER_SIDE' });
        this.props.globalEventDistributor.dispatch({ type: 'HELLO_FROM_THE_OTHER_SIDE' });
    };

    render() {
        return (
            <div>
                <button onClick={this.sayHello}>Say Hello</button>
                <button onClick={this.sayHelloFromTheOtherSide}>Say Hello from the other side</button>
                <label>{this.props.helloMessage}</label>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        helloMessage: state.helloMessage
    };
}

export default connect(mapStateToProps)(Regards);
