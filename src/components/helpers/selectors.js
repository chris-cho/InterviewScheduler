export function getAppointmentsForDay(state, day) {
  if(day && state.days.length){
    let appointments = [];
    const selectedDay = state.days.find(days=> days.name === day);
    if(selectedDay && selectedDay.appointments !== undefined){
      appointments = (selectedDay.appointments.map((id) => state.appointments[id]))
      return appointments;
    }
  }
  return [];
}

export function getInterview(state, interview) {
  if(interview && interview.interviewer){
    const interviewer = interview.interviewer.toString();
    const selectedInterview =
    {
      student: interview.student,
      interviewer: state.interviewers[interviewer]
    };
    return selectedInterview;
  }
  return null;
}

export function getInterviewersForDay(state, day){
  let interviewers = [];
  if(day && state.days.length){
    const selectedDay = state.days.find(days=> days.name === day);
  if(selectedDay && selectedDay.interviewers !== undefined){
    interviewers = selectedDay.interviewers.map((id) => state.interviewers[id.toString()])
    }
  }
  return interviewers;
}