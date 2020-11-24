import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

import FormItem from "./FormItem";
import Main from "./Main";

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route path="/" component={Main} />
                <Route path="/transactions" component={FormItem} />
            </Switch>
        </HashRouter>
    );
};

export default App;
