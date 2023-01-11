import React from "react";
import { createSlice } from "@reduxjs/toolkit";
import {
  personalDetails,
  educationalDetails,
  projectDetails,
} from "../Types/resumeData";

const initialStateValue = {
  personalDetails: personalDetails,
  educationalDetails: educationalDetails,
  projectDetails: [],
};

const ResumeDetails = createSlice({
  name: "Resume Details",
  initialState: { value: initialStateValue },
  reducers: {
    setPersonalDetails: (state, action) => {
      state.value.personalDetails = action.payload;
    },
    setEducationDetails: (state, action) => {
      state.value.educationalDetails = action.payload;
    },
    setProjectDetails: (state, action) => {
      state.value.projectDetails = action.payload;
    },
  },
});

export default ResumeDetails.reducer;
export const { setPersonalDetails, setEducationDetails, setProjectDetails } =
  ResumeDetails.actions;
