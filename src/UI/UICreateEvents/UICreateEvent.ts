import { IGlobalState } from "../../Components/Calendar/buildDate"
import { IEvent } from "../../Redux/redusers/eventReducer";
import { handlerPushNewEvent, recordErrorMessage} from "../../Redux/Actions/actionCreater";
import { Dispatch } from "redux";

export function handlerSaveEvent (gState:IGlobalState, events:IEvent[], dispatch: Dispatch):void{
    if(gState.events.createEvent.text===''|| gState.events.createEvent.text===' '){ //Если пользователь не ввел текст
        dispatch(recordErrorMessage('Введите название'))
        return
    }
    const event:IEvent={
        text:gState.events.createEvent.text,
        date: gState.calendar.selectedDay,
        time:gState.events.createEvent.time
    }
    if(events.length===0){// если  массив событий пустой - добавляю событие
       dispatch(handlerPushNewEvent(event))
       return
    } 
    const dateIsNotBease =  events.reduce((res, el:IEvent)=>{ //проверяю есть ли в массиве совпадение по дате и времени
        const a = `${el.date.Y}${el.date.M}${el.date.D}${el.time}`;
        const b = `${event.date.Y}${event.date.M}${event.date.D}${event.time}`;
        if(a===b){
            res=false;
        }
        return res
    },true)
    if(dateIsNotBease){ // если совпадений по дате и времени нет - добавляю событие
        dispatch(handlerPushNewEvent(event));
        return
    }
    else{
        dispatch(recordErrorMessage('По этому времени уже есть событие. Выберите другое время.'))
    }
}



