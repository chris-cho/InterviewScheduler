import React from "react";

import DayListItem from "./DayListItem";

export default function DayList(props){

  const list = props.days.map((day) => {
    return(
      <ul>
        <DayListItem
          key={day.id}
          name={day.name}
          spots={day.spots}
          selected={day.name === props.value}
          setDay={() => props.setDay(day.name)}
        />
      </ul>
    );
  });
  return (
    list
  );
}