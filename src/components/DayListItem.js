import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

export default function DayListItem(props) {

  const formatSpots = (spots) => {
    return spots === 0 ? "no spots remaining" : (spots === 1 ? spots + " spot remaining" : spots + " spots remaining");
  }
  const dayClass = classNames("day-list__item",{
    "day-list__item--selected" : props.selected === true ? true : false,
    "day-list__item--full" : props.spots === 0 ? true : false});
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}