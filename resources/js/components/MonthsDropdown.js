import React from "react";
import { Select } from "antd";
const { Option } = Select;

const MonthsDropdown = () => {
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const handleChange = value => {
        return console.log(`selected ${value}`);
    };
    return (
        <Select defaultValue="Please select" onChange={handleChange}>
            {months.map(month => (
                <Option value={month}>{month}</Option>
            ))}
        </Select>
    );
};
export default MonthsDropdown;
