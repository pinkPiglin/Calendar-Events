import { getdaysInMonth, nextMonthOfThisYear, prevMonthOfThisYear, Y_M_D } from "../../Components/Calendar/buildDate"
import {  ASSIGN_ACTIVE_DAY, DISPLAY_DAYS, DISPLAY_MONTH, GO_TODAY, GO_TO_MONTH, NEXT_MONTH, NEXT_YEAR, PREV_MONTH, PREV_YEAR, UPDATE_DAYS_IN_MONTH } from "../Actions/actionTypes"

export interface IDefaultState {
    year:number
    month:number
    daysInMonth:number
    today:Y_M_D
    selectedDay:Y_M_D
    display:{
        days:boolean
        month:boolean
        year:boolean
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
        month:false,
        year:false
    }

}


export const calendarReducer=(state=initialState, actions:any)=>{ 
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
                daysInMonth:getdaysInMonth(state.today.Y, state.today.M)
            }
            case GO_TO_MONTH:
                return {...state, year:actions.date.Y, month: actions.date.M}
            case NEXT_YEAR:
                return{...state, year:state.year+1}
            case PREV_YEAR:
                return{...state, year:state.year-1}
            case DISPLAY_MONTH:
                return{...state, display:{days:false, month:true,year:false}}
            case DISPLAY_DAYS:
                return{...state, year:actions.date.Y, month: actions.date.M, display:{days:true, month:false,year:false}}
        default:
            return state
    }
}