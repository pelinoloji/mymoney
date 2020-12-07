import React, { useState, useEffect } from "react";
import axios from "axios";

const API = () => {
    try {
        const [results, setResults] = useState([]);
        const [currentId, setCurrentId] = useState(0);

        const handleResult = () => {
            axios
                .get("/api/transactions")
                .then(response => {
                    setResults(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const addTransaction = data => {
            axios({
                method: "post",
                url: "/api/transactions",
                data: {
                    amount: data.amount,
                    tag: data.tag,
                    expense: expense,
                    currency: data.currency,
                    transaction_date: data.transaction_date.format("YYYY-MM-DD")
                }
            })
                .then(response => {
                    console.log(response);
                    handleResult();
                })
                .catch(error => {
                    console.log(error);
                });
        };

        const updateTransaction = data => {
            axios({
                method: "put",
                url: `api/transactions/${currentId}`,
                data: {
                    amount: data.amount,
                    tag: data.tag,
                    expense: expense,
                    currency: data.currency,
                    transaction_date: data.transaction_date.format("YYYY-MM-DD")
                }
            }).then(response => {
                console.log(response.data, "data");
                setCurrentId(0);
                handleResult();
            });
        };

        const deleteTransaction = id => {
            axios.delete(`api/transactions/${id}`).then(response => {
                console.log(response, "res");
                handleResult();
            });
        };
    } catch (e) {
        console.log(err, "render");
        return null;
    }
};
export default API;
