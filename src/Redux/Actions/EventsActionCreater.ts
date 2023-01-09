import { Y_M_D } from "../../Components/Calendar/buildDate";
import { IDisplay, IEvent } from "../redusers/eventReducer";
import {SAVE_VALUE_EVENT, SAVE_TIME_EVENT, PUSH_NEW_EVENT, DISPLAY_CREATE_EVENT, DELETE_EVENT, DEFINE_EDITABLE_EVENT, RESET_SELECTED_EVENT, REMEMBER_PRIMARY_TEXT, CACHE_EDITABLE_EVENT_TEXT, SAVE_CHANGED_EVENT, RECORD_ERROR, DELETE_ERROR_MESSAGE, GO_TO_NEXT_DAY, GO_TO_PREV_DAY, DISPLAY_CALENDAR_AND_REMEMBER_SELECTED_DAY, UPDATE_NEXT_DISPLAY_AND_SELECTED_DATE, TEST_ADD_ANY_EVENTS, UPDATE_SELECTED_DATE, DISPLAY_CALENDAR, DISPLAY_SHOW_EVENTS, FETCH_EVENTS} from "./actionTypes";

export function OnchangeEventValue(value:string){
    return{
        type:SAVE_VALUE_EVENT,
        value,
    }
}
export function OnChangeTimeEvent(value:string){
    return{
        type:SAVE_TIME_EVENT,
        value,
    } 
}

export function handlerPushNewEvent(){
    return{
        type:PUSH_NEW_EVENT
    }
}
export function DisplayCreateEvent(){
    return{
        type:DISPLAY_CREATE_EVENT
    }
}
export function DeleteEvent(arr:IEvent[]){
    return{
        type:DELETE_EVENT,
        newArray:arr
    }
}
export function defineEditableEvent(newId:string){
    return{
        type:DEFINE_EDITABLE_EVENT,
        newId
    }
}
export function resetSelectedEvent(){
    return{
        type:RESET_SELECTED_EVENT,
    }
}
export function rememberPimaryText(text:string){
    return{
        type:REMEMBER_PRIMARY_TEXT,
        newText:text
    }
}
export function cacheEditableEventText(text:string){
    return{
        type:CACHE_EDITABLE_EVENT_TEXT,
        newText:text
    }
}
export function saveChangedEvent(){
    return{
        type:SAVE_CHANGED_EVENT,
    }
}
export function  recordErrorMessage(newError:string){
    return{
        type:RECORD_ERROR,
        newError
    }
} 
export function deleteErrorMessage(){
    return{
        type:DELETE_ERROR_MESSAGE
    }
}

export function goToNextDay(){
    return{
        type:GO_TO_NEXT_DAY
    }
}
export function goToPrevDay(){
    return{
        type:GO_TO_PREV_DAY
    }
}
export function showСalendarЕemporarily(date:Y_M_D, nextDisplay:IDisplay){
    return{
        type:DISPLAY_CALENDAR_AND_REMEMBER_SELECTED_DAY,
        newDate: date,
        newDisplay:nextDisplay
    }
}
export function updateNextDisplayAndSelectedDate(date:Y_M_D){
    return{
        type:UPDATE_NEXT_DISPLAY_AND_SELECTED_DATE,
        newDate:date
    }
}
export function TESTaddAnyEvents(array:IEvent[]){
    return{
        type:TEST_ADD_ANY_EVENTS,
        newArray:array
    }
}
export function updateSelectedDate(date:Y_M_D){
    return{
        type:UPDATE_SELECTED_DATE,
        newDate:date
    }
}
export function displayCalendar(){
    return{
        type:DISPLAY_CALENDAR
    }
}
export function displayShowEvents(){
    return{
        type:DISPLAY_SHOW_EVENTS
    }
}
export function fetchEvents(events:IEvent[]){
    return{
        type:FETCH_EVENTS,
        newEvents:events
    }
}