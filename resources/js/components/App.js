import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Main from "./Main";
import Item from "./Item";

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route path="/transaction/edit" component={Item} />
            </Switch>
        </Router>
    );
};

export default App;
