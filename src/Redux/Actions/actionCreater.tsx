import { IEvent } from "../redusers/eventReducer";
import { ASSIGN_ACTIVE_DAY, GO_TODAY, GO_TO_MONTHS, NEXT_MONTH, NEXT_YEAR, PREV_MONTH, PREV_YEAR, UPDATE_DAYS_IN_MONTH, DISPLAY_MONTH, DISPLAY_DAYS, DISPLAY_YEARS, CHANGE_YEAR, SAVE_VALUE_EVENT, SAVE_TIME_EVENT, PUSH_NEW_EVENT, DISPLAY_CREATE_EVENT, DELETE_EVENT, DEFINE_EDITABLE_EVENT, RESET_SELECTED_EVENT, REMEMBER_PRIMARY_TEXT, CACHE_EDITABLE_EVENT_TEXT, SAVE_CHANGED_EVENT, RECORD_ERROR, DELETE_ERROR_MESSAGE} from "./actionTypes";

 export function handlerNextMonth(){
    return{type:NEXT_MONTH}
 }
 export function handlerPrevMonth(){
    return {type:PREV_MONTH}
 }

 export function handlerAssignActiveDate(year:number, month:number, day:number){
    return { 
        type: ASSIGN_ACTIVE_DAY, 
        date:{Y:year, M:month, D:day}
    }
 }

export function updateDayInMonth(){
    return{
        type:UPDATE_DAYS_IN_MONTH,
    }
}
export function handlerToday(){
    return{
        type:GO_TODAY
    }
}
export function handlerGoToMonth(Y:number):{type:string, year:number}{
    return{
        type:GO_TO_MONTHS,
        year:Y
    }
}
export function handlerNextYear(){
    return{
        type:NEXT_YEAR
    }
}
export function handlerPrevYear(){
    return{
        type:PREV_YEAR
    }
}
export function handlerDisplayMonth(){
    return{
        type:DISPLAY_MONTH
    }
}
interface IDisplayMonths{
    type:string

}
export function handlerDisplayDays(Y:number, M:number){
    return{
        type:DISPLAY_DAYS,
        date:{Y,M}
    }
}
export function handlerDisplayYears(){
    return{
        type:DISPLAY_YEARS
    }
}
export function handlerChangeYear(Y:number){
    return{
        type:CHANGE_YEAR,
        year:Y
    }
}
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
export function handlerPushNewEvent(event:{}){
    return{
        type:PUSH_NEW_EVENT,
        event,
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
export function saveChangedEvent(array:IEvent[]){
    return{
        type:SAVE_CHANGED_EVENT,
        newEvents:array
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