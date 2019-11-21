import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div>
                        <Route exact path="/" component={Fib} />
                        <Route path="/otherpage" component={OtherPage} />
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;

