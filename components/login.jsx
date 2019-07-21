import React from 'react';
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";

class Login extends React.Comonent {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            userName: null
        };
    }
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        const state = this.state;
        let errorMessage = "";
        if (!state.userName) {
            errorMessage = "Please enter user name.";
        } else if (!state.password) {
            errorMessage = "Please enter password";
        }
        this.setState("error", errorMessage);
        if (!errorMessage) {
            this.props.onLogin(state.userName, state.password);
        }
    }

    render() {
        if (this.props.show) {
            return (
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="userName" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.userName}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                </form>
            )
        } else {
            return (<div />)
        }
    }
}

module.exports = Login;