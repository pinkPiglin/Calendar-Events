import { ASSIGN_ACTIVE_DAY, GO_TODAY, GO_TO_MONTH, NEXT_MONTH, NEXT_YEAR, PREV_MONTH, PREV_YEAR, UPDATE_DAYS_IN_MONTH, DISPLAY_MONTH, DISPLAY_DAYS} from "./actionTypes";

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
export function handlerGoToMonth(Y:number, M:number):{type:string, date:{}}{
    return{
        type:GO_TO_MONTH,
        date:{Y,M}
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
export function handlerDisplayDays(Y:number, M:number):{type:string, date:{}}{
    return{
        type:DISPLAY_DAYS,
        date:{Y,M}
    }
}