import { CACHE_EDITABLE_EVENT_TEXT, DEFINE_EDITABLE_EVENT, DELETE_ERROR_MESSAGE, DELETE_EVENT, DISPLAY_CREATE_EVENT, PUSH_NEW_EVENT, RECORD_ERROR, REMEMBER_PRIMARY_TEXT, RESET_SELECTED_EVENT, SAVE_CHANGED_EVENT, SAVE_TIME_EVENT, SAVE_VALUE_EVENT } from "../Actions/actionTypes";
import {  Y_M_D } from "../../Components/Calendar/buildDate";


export interface IEventState{
    display:{
        calendar:boolean
        showEvents:boolean
        createEvent:boolean
    }
    selectedDay:Y_M_D
    events:IEvent[]
    showEvents:{
        edit:{
            id:string
            text:string
        }
    }
    createEvent:{
        text:string,
        time:string
        userError:{
            name:string
        }

    }
}
export interface IEvent{
    time:string,
    text:string,
    date:Y_M_D
}
const initialState:IEventState={
    display:{
        calendar:false,
        showEvents:false,
        createEvent:true
    },
    selectedDay:{
        Y:new Date().getFullYear(),
        M:new Date().getMonth(),
        D:new Date().getDate()
    },
    events:[],
    showEvents:{
        edit:{
            id:'',
            text:''
        }
    },
    createEvent:{
        text:'',
        time: `${new Date().getHours()<10?'0':''}${new Date().getHours()}:${new Date().getMinutes() <10?'0':''}${new Date().getMinutes()}`,
        userError:{
            name:''
        }
    }
}
export const eventReducer=(state=initialState, actions:any):IEventState=>{
    switch(actions.type){
        case SAVE_VALUE_EVENT:
            return{...state, createEvent:{...state.createEvent, text: actions.value}}
        case SAVE_TIME_EVENT:
            return{...state, createEvent:{...state.createEvent, time: actions.value}}
        case PUSH_NEW_EVENT:
            return{...state, events:[...state.events, actions.event], createEvent:{...state.createEvent, text:'',userError:{name:''}}, display:{
                calendar:false,
                showEvents:true,
                createEvent:false
            }}
        case DISPLAY_CREATE_EVENT:
            return{...state,  display:{calendar:false, showEvents:false, createEvent:true}}
        case DELETE_EVENT:
            return{...state, events:actions.newArray}
        case DEFINE_EDITABLE_EVENT:
            return{...state, showEvents:{edit:{...state.showEvents.edit, id:actions.newId}}}
        case REMEMBER_PRIMARY_TEXT:
            return{...state,showEvents:{edit:{...state.showEvents.edit, text:actions.newText}} }
        case RESET_SELECTED_EVENT:
            return{...state,showEvents:{edit:{id:'', text:''}} }
        case CACHE_EDITABLE_EVENT_TEXT:
            return{...state, showEvents:{edit:{...state.showEvents.edit, text:actions.newText}} }
        case SAVE_CHANGED_EVENT:
            return{...state, events: actions.newEvents, showEvents:{edit:{id:'', text:''}}}
        case RECORD_ERROR:
            return{...state, createEvent:{...state.createEvent, userError:{name: actions.newError}}}
        case DELETE_ERROR_MESSAGE:
            return{...state,createEvent:{...state.createEvent, userError:{name:''}} }
        default:
            return state
    }
}