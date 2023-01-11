import { configureStore } from "@reduxjs/toolkit";
import ResumeDetails from "../Global_states/ResumeDetails";

export const Store = configureStore({
  reducer: {
    ResumeDetails: ResumeDetails
  },
});

export type RootState = ReturnType<typeof Store.getState>;

export default Store;