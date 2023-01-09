import { useDispatch, useSelector } from "react-redux"
import {useEffect, useRef} from 'react'
import { IEvent} from "../../Redux/redusers/eventReducer";
import { IGlobalState } from "../Calendar/buildDate";
import { getDateFormat_W_D_M} from "../Calendar/calendar";
import { handlerNextDay, handlerPrevDay} from "../../UI/UIShowEvents/UIShowEvents";
import { showСalendarЕemporarily} from "../../Redux/Actions/EventsActionCreater";
import { drowEvents } from "./drowEvents";
import { useScrollbar } from "../../hook/useScrollBar";

export function eventsOnSelecteDay(state:IGlobalState, events:IEvent[]):IEvent[]{ // фильтр событий по выбранному дню
    return events.filter((el:IEvent)=> JSON.stringify(el.date)=== JSON.stringify(state.calendar.selectedDay))
}


export const ShowEvents =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const events =gState.events.events;
    const eventsOnDay:IEvent[] = eventsOnSelecteDay(gState, events)
    const dispatch = useDispatch();
    const listEventsWrapper = useRef(null);
    const hasScroll:boolean = eventsOnDay.length>6? true : false
    useScrollbar(listEventsWrapper, hasScroll)

    useEffect(()=>{
        const id = gState.events.showEvents.edit.id;
        if(id!==''){ // если пользователь редактирует textarea
            const textarea = document.getElementById(id)!;
            textarea.focus()
        } 
    })

    return (
        <div className="ShowEvents">

            <div className="headerEvents" >
                <button className="prevDay" onClick={()=>handlerPrevDay(gState, dispatch)}>{'<'}</button>
                <h4 
                    onClick={()=>dispatch(showСalendarЕemporarily(gState.calendar.selectedDay, {calendar:false, showEvents:true, createEvent:false}))} // временно отображаю календарь
                    >{getDateFormat_W_D_M(gState.calendar.selectedDay)}
                </h4> 
                <button className="nextDay" onClick={()=>handlerNextDay(gState, dispatch)}>{'>'}</button>
            </div>

            <div ref={listEventsWrapper} style={{height:'337px'}}>
                <div className="listEvents" >
                    {(events.length>0) && eventsOnDay.length>0 ?  //если [] всех событий не пустой, и на этот день есть события[] 
                        drowEvents(eventsOnDay, gState, dispatch)
                    : <div className="noEvents">Нет событий</div>}
                </div>
            </div>
            
        </div>
    )
}