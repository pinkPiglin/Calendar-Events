import { useDispatch, useSelector } from "react-redux"
import {useEffect} from 'react'
import { IEvent} from "../../Redux/redusers/eventReducer";
import { IGlobalState } from "../Calendar/buildDate";
import { getDateFormat_W_D_M} from "../Calendar/calendar";
import { handlerDisplayCreateEvent, handlerNextDay, handlerPrevDay} from "../../UI/UIShowEvents/UIShowEvents";
import { showСalendarЕemporarily, updateNextDisplayAndSelectedDate} from "../../Redux/Actions/actionCreater";
import { drowEvents } from "./drowEvents";

export function eventsOnSelecteDay(state:IGlobalState, events:IEvent[]):IEvent[]{ // фильтр событий по выбранному дню
    return events.filter((el:IEvent)=> JSON.stringify(el.date)=== JSON.stringify(state.calendar.selectedDay))
}


export const ShowEvents =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const events =gState.events.events;
    const eventsOnDay = eventsOnSelecteDay(gState, events)
    const dispatch = useDispatch();

    useEffect(()=>{
        const id = gState.events.showEvents.edit.id;
        if(id!==''){ // если пользователь редактирует textarea
            const textarea = document.getElementById(id)!;
            textarea.focus()
        }
        if( // если сейчас отображается Не календарь &&  есть разница в выбранном дне между календарем и событиями
            (gState.events.display.calendar === false) &&
            ( JSON.stringify(gState.events.selectedDate)!== JSON.stringify(gState.calendar.selectedDay) )
        )
        {
            dispatch(updateNextDisplayAndSelectedDate(gState.calendar.selectedDay))
        }
    })

    return (
        <div className="ShowEvents">

            <div className="headerEvents">
                <button className="prevDay" onClick={()=>handlerPrevDay(gState, dispatch)}>{'<'}</button>
                <h4 
                    onClick={()=>dispatch(showСalendarЕemporarily(gState.calendar.selectedDay, {calendar:false, showEvents:true, createEvent:false}))} // временно отображаю календарь
                    >{getDateFormat_W_D_M(gState.calendar.selectedDay)}
                </h4> 
                <button className="nextDay" onClick={()=>handlerNextDay(gState, dispatch)}>{'>'}</button>
            </div>

            <div className="listEvents">
                {(events.length>0) && eventsOnDay.length>0 ?  //если [] всех событий не пустой, и на этот день есть события[] 
                    drowEvents(eventsOnDay, gState, dispatch)
                : <div className="noEvents">Нет событий</div>}
            </div>
            <button 
                onClick={()=>handlerDisplayCreateEvent(dispatch)} // отображаю страницу создания события
                className="addEvent"> 
            </button>
            
        </div>
    )
}