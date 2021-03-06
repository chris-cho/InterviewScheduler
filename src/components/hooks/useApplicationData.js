import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(initial) {

  const [state, setState] = useState(initial || {});
  useEffect(() => {
      Promise.all([
          axios.get('/api/days'),
          axios.get('/api/appointments'),
          axios.get('/api/interviewers')
          ])
        .then((all) => {
          setState(prev => ({...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data, day: "Monday"}))
        })
        .catch(e => console.log(e))
      }, []);

  const setDay = day => setState({ ...state, day });

  const bookInterview = (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
        };

      const appointments = {
      ...state.appointments,
      [id]: appointment
      };

      const days = updateSpots('add');

      return axios.put(`/api/appointments/` + appointment.id, appointment)
      .then(() => setState({ ...state, appointments, days }))
    }

    const editInterview = (id, interview) => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
        };

      const appointments = {
      ...state.appointments,
      [id]: appointment
      };

      const days = updateSpots('edit');

      return axios.put(`/api/appointments/` + appointment.id, appointment)
      .then(() => setState({ ...state, appointments, days }))
    }


  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id]
      };
    const appointments = {
      ...state.appointments,
      [id]: appointment
      };

    appointments[id].interview = {};

    const days = updateSpots('delete');

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({ ...state, appointments, days }))
  }

  const updateSpots = (action) => {
    const index = state.days.findIndex(index => index.name === state.day);
    const copyDays = state.days
    if (action === 'delete') {
      copyDays[index].spots++
    }
    if (action === 'add'){
      copyDays[index].spots--
    }
    return copyDays;
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview};
}