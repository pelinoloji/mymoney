import React from "react";

const Result = (results, columns) => {
    return (
        <div>
            <h3>Results</h3>
            <div>
                {!!results?.length ? (
                    <Table
                        key={results.id}
                        dataSource={results}
                        columns={columns}
                        size="middle"
                    />
                ) : null}
            </div>
        </div>
    );
};

export default Result;
