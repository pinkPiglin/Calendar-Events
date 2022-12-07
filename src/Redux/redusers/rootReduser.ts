import { combineReducers } from "redux";
import { calendarReducer } from "./calendarResucer";

export default combineReducers({
    calendar: calendarReducer,
})