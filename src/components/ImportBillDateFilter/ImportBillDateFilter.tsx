import React, { useState } from "react";
import RangeDatePicker from "../RangeDatePicker/RangeDatePicker";
import Button from "../Button/Button";

interface ImportBillDateFilterProps {
    onSearch: (start: Date, end: Date) => void;
}

const ImportBillDateFilter = ({ onSearch }: ImportBillDateFilterProps) => {
    const [start, setStart] = useState<Date>(new Date());
    const [end, setEnd] = useState<Date>(new Date());

    const handleSelectStart = (date: Date) => {
        setStart(date);
    };

    const handleSelectEnd = (date: Date) => {
        setEnd(date);
    };

    const handleSearch = () => {
        start && end && onSearch(start, end);
    };

    return (
        <div className="flex gap-6">
            <RangeDatePicker
                onSelectedStartDateChanged={handleSelectStart}
                onSelectedEndDateChanged={handleSelectEnd}
            />
            <Button size="md" onClick={handleSearch}>
                Search
            </Button>
        </div>
    );
};

export default ImportBillDateFilter;

