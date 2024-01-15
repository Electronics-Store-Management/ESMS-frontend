import { Datepicker, DatepickerProps } from "flowbite-react";
import React from "react";

interface RangeDatePickerProps extends DatepickerProps {
    onSelectedStartDateChanged: (start: Date) => void;
    onSelectedEndDateChanged: (end: Date) => void;
}

const RangeDatePicker = ({
    onSelectedStartDateChanged,
    onSelectedEndDateChanged,
}: RangeDatePickerProps) => {
    const handleSelectStart = (date: Date) => {
        onSelectedStartDateChanged(date);
    };

    const handleSelectEnd = (date: Date) => {
        onSelectedEndDateChanged(date);
    };

    return (
        <div>
            <div date-rangepicker="true" className="flex flex-col sm:flex-row items-center gap-4">
                <Datepicker onSelectedDateChanged={handleSelectStart} />
                <div className="w-3 border-t border-secondary-200" />
                <Datepicker onSelectedDateChanged={handleSelectEnd} />
            </div>
        </div>
    );
};

export default RangeDatePicker;

