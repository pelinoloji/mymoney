import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import FormItem from "./FormItem";
import Main from "./Main";

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={Main} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;
