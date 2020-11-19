import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    return (
        <div>
            <div>test</div>
        </div>
    );
};

export default App;

// DOM element
if (document.getElementById("root")) {
    ReactDOM.render(<App />, document.getElementById("root"));
}
