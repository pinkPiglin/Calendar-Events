
import { getdaysInMonth, nextMonthOfThisYear, prevMonthOfThisYear, Y_M_D } from "../../Components/Calendar/buildDate"
import {  ASSIGN_ACTIVE_DAY, CHANGE_YEAR, DISPLAY_DAYS, DISPLAY_MONTH, DISPLAY_YEARS, GO_TODAY, GO_TO_MONTHS, GO_TO_NEXT_DAY, GO_TO_PREV_DAY, NEXT_MONTH, NEXT_YEAR, PREV_MONTH, PREV_YEAR, UPDATE_DAYS_IN_MONTH } from "../Actions/actionTypes"

export interface IDefaultState {
    year:number
    month:number
    daysInMonth:number
    today:Y_M_D
    selectedDay:Y_M_D
    display:{
        days:boolean
        months:boolean
        years:boolean
    }
}

const initialState:IDefaultState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    daysInMonth: getdaysInMonth(new Date().getFullYear(),new Date().getMonth()),
    today:{
        Y:new Date().getFullYear(),
        M:new Date().getMonth(),
        D:new Date().getDate()
    },
    selectedDay:{
        Y:new Date().getFullYear(),
        M:new Date().getMonth(),
        D:new Date().getDate()
    },
    display:{
        days:true,
        months:false,
        years:false
    }

}


export const calendarReducer=(state=initialState, actions:any):IDefaultState=>{ 
    switch(actions.type){
        case NEXT_MONTH:
            return {...state, 
                month: nextMonthOfThisYear(state.month)? state.month +1 : 0,
                year:  nextMonthOfThisYear(state.month)? state.year : state.year+1
            }
        case PREV_MONTH:
            return {...state, 
                month: prevMonthOfThisYear(state.month) ? state.month-1 : 11,
                year: prevMonthOfThisYear(state.month)? state.year: state.year-1,
            
            }
        case ASSIGN_ACTIVE_DAY:
            return {...state, selectedDay: typeof actions.date ==='object'? actions.date: 0}
        case UPDATE_DAYS_IN_MONTH:
            return {...state, daysInMonth: getdaysInMonth(state.year, state.month) }
        case GO_TODAY:
            return {...state, 
                year:state.today.Y,
                month:state.today.M,
                daysInMonth:getdaysInMonth(state.today.Y, state.today.M),
                display:{days:true, months:false,years:false}
            }
        case GO_TO_MONTHS:
            return {...state, year:actions.year, display:{days:false, months:true,years:false}}
        case NEXT_YEAR:
            return{...state, year:state.year+1}
        case PREV_YEAR:
            return{...state, year:state.year-1}
        case DISPLAY_MONTH:
            return{...state, display:{days:false, months:true,years:false}}
        case DISPLAY_DAYS:
            return{...state, year:actions.date.Y, month: actions.date.M, display:{days:true, months:false,years:false}}
        case DISPLAY_YEARS:
            return{...state, display:{days:false, months:false,years:true}}
        case CHANGE_YEAR:
            return{...state, year:actions.year}
        case GO_TO_NEXT_DAY:
            return{...state, selectedDay:{...state.selectedDay, D: state.selectedDay.D+1}}
        case GO_TO_PREV_DAY:
            return{...state, selectedDay:{...state.selectedDay, D: state.selectedDay.D -1}}
        default:
            return state
    }
}