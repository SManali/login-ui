import request from "superagent";
import React from "react";
import ReactDOM from "react-dom";

import Login from "./login.jsx";
import SignUP from "./sign-up.jsx";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogined: false,
            showSignUp: false
        }
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="parent-container container login-page-container">
                    <div id="overlay-inAbox" className="overlay" />
                    <Login
                        show={!this.state.isLoggined && !this.state.showSignUp} onShowSignUp={this.onShowSignUp}
                        onLogin={this.onLogin} />

                    <SignUP
                        show={!this.state.isLoggined && this.state.showSignUp} onLogin={this.onShowLogin} onSignUp={this.onSignUp} />
                </div>
            </React.Fragment>
        );
    }
    onShowSignUp() {
        this.state.setState('showSignUp', true);
    }
    onShowLogin() {
        this.state.setState('showSignUp', false);
    }
    onSignUp(username, passWord) {
        this.showOverlay();
        const args = {
            data: {
                username: username,
                passWord: passWord
            },
            header: {
                "Content-Type": "application/json"
            }
        };
        request.post(process.env.loginUrl + "/sign-up", args, (err, data) => {
            this.hideOverlay();
            if (err) {
                console.error(err);
                this.state("errorMessage", "Error while signing up");
                return;
            }
            this.setState({
                isLoggined: true
            });
        });
    }

    onLogin(username, passWord) {
        this.showOverlay();
        const args = {
            data: {
                username: username,
                passWord: passWord
            },
            header: {
                "Content-Type": "application/json"
            }
        };
        request.post(process.env.loginUrl + "/login", args, (err, data) => {
            this.hideOverlay();
            if (err) {
                console.error(err);
                this.setState("error", "User name or password is incorrect");
                return;
            }
            this.setState({
                isLoggined: true
            });
        });
    }
    showOverlay() {
        window.openOverlay("overlay-inAbox");
        this.setState({ loaded: false });
    }
    hideOverlay() {
        window.closeOverlay("overlay-inAbox");
        this.setState({ loaded: true });
    }

}

ReactDOM.render(<App />, document.getElementById("app"));