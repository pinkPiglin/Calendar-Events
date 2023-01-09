import { defineEditableEvent, DeleteEvent, DisplayCreateEvent, goToNextDay, goToPrevDay, saveChangedEvent, TESTaddAnyEvents} from "../../Redux/Actions/EventsActionCreater";
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer";
import { Dispatch } from "redux";
import { IGlobalState, Y_M_D } from "../../Components/Calendar/buildDate";
import { DeleteOneEvent, GetAllEvents, PutEvent } from "../../Redux/Actions/AsyncActions";


export async function handlerdeleteEvent(userId:string, id:string, dispatch:Dispatch){
    await DeleteOneEvent(userId, id)(dispatch) 
    await GetAllEvents(userId)(dispatch)
}

export function handlerDisplayCreateEvent(dispatch: Dispatch):void{
    dispatch(DisplayCreateEvent())
}

export function handlerEditEvent(id:string, state:IEventState, dispatch: Dispatch ){
    if(state.showEvents.edit.id ===id){
        dispatch(defineEditableEvent(""))
    }
    else{
        dispatch(defineEditableEvent(id));
    }
}

export async function handlerSaveChangedEvent(state:IGlobalState, dispatch: Dispatch, id:string){
    const changeText = state.events.showEvents.edit.text
    const userId = state.auth.user?.id!
    const editId = state.events.showEvents.edit.id
    if(!changeText.trim()){
        await DeleteOneEvent(id)
    }
    else{
        await PutEvent(userId, editId, changeText)(dispatch)
    }
    await GetAllEvents(userId)(dispatch)
}
export function handlerNextDay(state:IGlobalState, dispatch: Dispatch):void{
    if(state.calendar.daysInMonth > state.calendar.selectedDay.D){
        dispatch(goToNextDay())
    }
}
export function handlerPrevDay(state:IGlobalState, dispatch: Dispatch):void{
    if(state.calendar.selectedDay.D >1){
        dispatch(goToPrevDay())
    }
}
export function handlerCreateAnyEvents(dispatch:Dispatch, date:Y_M_D){
    const result:IEvent[]=[];
    for(let i=10; i<=20; i++){
        const ev:IEvent={
            date,
            text:`Тестовое событие ${i}`,
            time:`00:${i}`
        }
        result.push(ev)
    }
    dispatch(TESTaddAnyEvents(result))
}