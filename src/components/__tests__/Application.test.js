import { render, cleanup, fireEvent, getByText, waitForElementToBeRemoved, waitFor } from "@testing-library/react";

import Application from "components/Application";
import { act } from "react-dom/test-utils";

afterEach(cleanup);

describe("Application", () => {


  //   it("changes the schedule when a new day is selected", () => {
  //     const { getByText } = render(<Application />);

  //     //return waitForElement(() => getByText("Monday"));
  //   });
  // });
//   //const appointments = [
//   //   {
//   //     "3": {
//   //       id: 3,
//   //       time: "2pm",
//   //       interview: { student: "Leopold Silvers", interviewer: 4 }
//   //     },
//   //   }
//   // ];

  it("changes the schedule when a new day is selected", 
  async () => {
    // act(() => {
      const { getByText } = render(<Application />)
    // });
    
       await waitFor(() => getByText("Monday"))
      
       fireEvent.click(getByText("Tuesday"))

       expect(getByText("Leopold Silvers")).toBeInTheDocument();
  })

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1",
  async () => {
    const { container } = render(<Application />);
    
    await waitForElement(() => container("Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = getAllByTestId(container, "appointment")[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));  

  })

  xit("loads data, books an interview and reduces the spots remaining for Monday by 1", () => {
    const { container } = render(<Application />);
    console.log(container);
  });  
});