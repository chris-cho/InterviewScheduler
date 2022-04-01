import React from "react";

import "components/Appointment/style.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../hooks/useVisualMode"
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props){
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const DELETING = "DELETING";
  const ERROR_DELETE = "ERROR_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const EDIT = "EDIT";

  function onSave(student, interviewer, type){
      const interview = {
      interviewer,
      student
      }

    transition(SAVING);
    
    if (mode === EDIT) {
      props
      .editInterview(props.id, interview)
      .then(() => onComplete())
      .catch((error) => transition(ERROR_SAVE, true))
    } else {
      props
      .bookInterview(props.id, interview)
      .then(() => onComplete())
      .catch((error) => transition(ERROR_SAVE, true))
    }
}

  function onComplete() {
    transition(SHOW)
  }

  function onDelete(){
    transition(DELETING)
    props
      .cancelInterview(props.id)
      .then(()=>transition(EMPTY))
      .catch((error) => transition(ERROR_SAVE, true))
  }
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  return(
    <article className="appointment" data-testid="appointment">  
    <Header time={props.time} />
      {mode === EMPTY && 
        <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && (
        <Status
          message={"Saving"}/>
      )}
      {mode === SHOW && (
        <Show
        id = {props.id}
        student={props.interview.student}
        interviewer={props.interview.interviewer}
        onEdit={() => transition(EDIT)}
        onDelete={() => transition(DELETE)}/>
      )}
      {mode === CREATE && (
        <Form
          id = {props.id}
          interviewers={props.interviewers}
          onCancel= {() => back()}
          onDelete={()=>transition(DELETE)}
          onSave={onSave}
        />
      )}
      {mode === DELETE && (
        <Confirm 
          message={"Are you sure you would like to delete?"}
          onCancel={back}
          onConfirm={onDelete}/>
      )}
      {mode === DELETING && (
        <Status 
          message={"Deleting"}/>
      )}
      {mode === EDIT && (
        <Form
          id = {props.id}
          interviewers={props.interviewers}
          onDelete={()=>transition(DELETE)}
          onSave={onSave}
          onCancel= {() => back()}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          />
      )}
      {mode === ERROR_SAVE && (
        <Error
        message={"Could not create the appointment"}
        onClose={() => back()}
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
        message={"Could not cancel the appointment"}
        onClose={() => back()}
        />
      )}
    </article>
  )
}