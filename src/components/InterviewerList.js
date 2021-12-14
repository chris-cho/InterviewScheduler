import React from "react"

import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem"

export default function InterviewerList(props) {
  const list = props.interviewers.map((interviewer) => {
    if(interviewer){
      return(
        <InterviewerListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === props.value}
          setInterviewerByID={() => props.onChange(interviewer.id)}
        />
      )
    }
  });
  return (
    <>
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">
      {list}
    </ul>
    </>
  )
}