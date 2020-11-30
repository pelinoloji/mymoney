import React from "react";

const SelectItem = () => {
    return (
        <div>
            {" "}
            <Select
                dropdownRender={menu => (
                    <div>
                        {menu}
                        <Divider style={{ margin: "4px 0" }} />
                        <div
                            style={{
                                display: "flex",
                                flexWrap: "nowrap",
                                padding: 8
                            }}
                        >
                            <Input
                                style={{ flex: "auto" }}
                                value={newCurrencyTitle}
                                onChange={e =>
                                    setNewCurrencyTitle(e.target.value)
                                }
                            />
                            <a
                                style={{
                                    flex: "none",
                                    padding: "8px",
                                    display: "block",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    setCurrencies([
                                        ...currencies,
                                        newCurrencyTitle
                                    ]);
                                    setNewCurrencyTitle(" ");
                                }}
                            >
                                <PlusOutlined /> Add item
                            </a>
                        </div>
                    </div>
                )}
            >
                {currencies.map((item, index) => {
                    return <Option key={item}>{item}</Option>;
                })}
            </Select>
        </div>
    );
};
