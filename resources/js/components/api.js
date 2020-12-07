import axios from "axios";

export const handleResult = setResults => {
    try {
        axios
            .get("/api/transactions")
            .then(response => {
                setResults(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error, "render");
        return null;
    }
};

export const addTransaction = (data, expense, setResults) => {
    try {
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
                handleResult(setResults);
            })
            .catch(error => {
                console.log(error);
            });
    } catch (error) {
        console.log(error, "render");
        return null;
    }
};

export const updateTransaction = (data, currentId, expense, setResults) => {
    try {
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
            handleResult(setResults);
        });
    } catch (error) {
        console.log(error, "render");
        return null;
    }
};

export const deleteTransaction = (id, setResults) => {
    try {
        axios.delete(`api/transactions/${id}`).then(response => {
            console.log(response, "res");
            handleResult(setResults);
        });
    } catch (error) {
        console.log(error, "render");
        return null;
    }
};
