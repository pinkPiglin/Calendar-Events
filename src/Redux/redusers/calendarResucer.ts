import { getdaysInMonth, nextMonthOfThisYear, prevMonthOfThisYear } from "../../Components/Calendar/buildDate"
import {  ASSIGN_ACTIVE_DAY, NEXT_MONTH, PREV_MONTH, UPDATE_DAYS_IN_MONTH } from "../Actions/actionTypes"

export interface IDefaultState {
    year:number
    month:number
    daysInMonth:number
    today:number
    selectedDay:{Y:number, M:number; D:number}
    arrayDates:[] | {}[]
}

const initialState:IDefaultState = {
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    daysInMonth: getdaysInMonth(new Date().getFullYear(),new Date().getMonth()),
    today: new Date().getDate(),
    selectedDay:{
        Y:new Date().getFullYear(),
        M:new Date().getMonth(),
        D:new Date().getDate()
    },
    arrayDates:[]
}


export const calendarReducer=(state=initialState, actions:any)=>{
    console.log('calendarReducer: ',state)
    
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
      
        default:
            return state
    }
}