import { combineReducers } from "redux";
import { calendarReducer } from "./calendarResucer";
import { eventReducer } from "./eventReducer";

export default combineReducers({
    calendar: calendarReducer,
    events:eventReducer
})

