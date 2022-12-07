import { ASSIGN_ACTIVE_DAY, NEXT_MONTH, PREV_MONTH, UPDATE_DAYS_IN_MONTH } from "./actionTypes";

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