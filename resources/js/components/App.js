import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Item from "./Item";
import Main from "./Main";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/asd" component={Item} />
                <Route exact path="/" component={Main} />
            </Switch>
        </Router>
    );
};

export default App;
