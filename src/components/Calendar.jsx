import React, {useState} from "react";
import CalendarComponent from 'react-calendar';
import "../routes/stylesheets/Calendar.css";
import 'react-calendar/dist/Calendar.css';

const Calendar = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="calendar-body">
      <CalendarComponent onChange={onChange} value={value} />
    </div>
  );
};

export default Calendar;
