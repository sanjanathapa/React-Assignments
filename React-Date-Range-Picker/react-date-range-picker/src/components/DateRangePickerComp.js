import React, { useReducer } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateRangePickerComp = () => {
  const [localState, setLocalState] = useReducer((prevState, newState) => ({ ...prevState, ...newState }), {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const { startDate, endDate, key } = localState;

  const handleSelect = (range) => {
    console.log(range, "ranges---------------");
    setLocalState({
      startDate: range?.selection?.startDate,
      endDate: range?.selection?.endDate,
    });
  };

  const selectionRange = {
    startDate,
    endDate,
    key,
  };

  const maximumDate = new Date();
  maximumDate.setDate(startDate.getDate() + 15);

  return (
    <DateRangePicker minDate={startDate} maxDate={maximumDate} ranges={[selectionRange]} onChange={handleSelect} />
  );
};

export default DateRangePickerComp;
