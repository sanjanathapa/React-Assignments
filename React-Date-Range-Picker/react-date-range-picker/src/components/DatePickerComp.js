import { Calendar } from "react-date-range";

const DatePickerComp = () => {
  // const [date, setDate] = useState(new Date());

  function handleSelect(date) {
    console.log(date); // native Date object
  }

  return (
    <Calendar
      date={new Date()}
      onChange={() => {
        handleSelect();
      }}
    />
  );
};

export default DatePickerComp;
