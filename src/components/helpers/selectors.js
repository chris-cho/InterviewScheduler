export function getAppointmentsForDay(state, day) {
  if(day){
    let appointments = [];
    const selectedDay = state.days.find(days=> days.name === day);
    if(selectedDay){
      appointments = (selectedDay.appointments.map((id) => state.appointments[id]))
      return appointments;
    }
  }
  return null
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
  if(day){
    let interviewers = [];
    const selectedDay = state.days.find(days=> days.name === day);
    if(selectedDay){
      interviewers = (selectedDay.interviewers.map((id) => state.interviewers[id]))
    }
    return interviewers;
  }
  return null;
}