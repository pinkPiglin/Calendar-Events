import { defineEditableEvent, DeleteEvent, DisplayCreateEvent, goToNextDay, goToPrevDay, saveChangedEvent, TESTaddAnyEvents} from "../../Redux/Actions/actionCreater";
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer";
import { Dispatch } from "redux";
import { IGlobalState, Y_M_D } from "../../Components/Calendar/buildDate";


export function handlerdeleteEvent(id:number, events:IEvent[], dispatch: Dispatch):void{
    const arrStr = JSON.stringify(events);
    const arr:IEvent[] = JSON.parse(arrStr);
    arr.splice(id, 1)
    dispatch(DeleteEvent(arr))
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

export function handlerSaveChangedEvent(state:IEventState, dispatch: Dispatch, id:number){
    const arr = state.events.map((el, i)=>{
        if(id===i){
            return{
                date:el.date,
                text:state.showEvents.edit.text,
                time:el.time
            }
        }
        return el
    })
    dispatch(saveChangedEvent(arr))
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
    for(let i=10; i<=30; i++){
        const ev:IEvent={
            date,
            text:`Тестовое событие ${i}`,
            time:`00:${i}`
        }
        result.push(ev)
    }
    dispatch(TESTaddAnyEvents(result))
}