import React from 'react';
import {
    HelpBlock,
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";

class SignUp extends React.Comonent {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            confirmPassword: "",
            newUser: null
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
        } else if (state.password !== state.confirmPassword) {
            errorMessage = "Password and confirm password should be same";
        }
        this.setState("error", errorMessage);
        if (!errorMessage) {
            this.props.onSignUp(state.userName, state.password);
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
                    <FormGroup controlId="confirmPassword" bsSize="large">
                        <ControlLabel>Confirm Password</ControlLabel>
                        <FormControl
                            value={this.state.confirmPassword}
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

module.exports = SignUp;