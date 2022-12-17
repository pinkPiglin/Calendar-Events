import { combineReducers } from "redux";
import { calendarReducer } from "./calendarResucer";
import { eventReducer } from "./eventReducer";
import { AuthReducer } from "./AuthReducer";

export default combineReducers({
    calendar: calendarReducer,
    events:eventReducer,
    auth: AuthReducer
})

