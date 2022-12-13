import { defineEditableEvent, DeleteEvent, DisplayCreateEvent, saveChangedEvent} from "../../Redux/Actions/actionCreater";
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer";
import { Dispatch } from "redux";


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