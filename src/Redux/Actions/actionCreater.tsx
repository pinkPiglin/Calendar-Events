import { ASSIGN_ACTIVE_DAY, GO_TODAY, GO_TO_MONTHS, NEXT_MONTH, NEXT_YEAR, PREV_MONTH, PREV_YEAR, UPDATE_DAYS_IN_MONTH, DISPLAY_MONTH, DISPLAY_DAYS, DISPLAY_YEARS, CHANGE_YEAR} from "./actionTypes";

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