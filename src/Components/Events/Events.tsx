import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import Calendar from "../Calendar/calendar";
import { CreateEvent } from "./CreateEvent";
import './events.scss'
import { ShowEvents } from "./ShowEvents";
import { updateSelectedDate } from "../../Redux/Actions/EventsActionCreater";
import { IDisplay } from "../../Redux/redusers/eventReducer";
import { BtnDisplayCreateEvent } from "./Buttons/BtnDisplayCreateEvent";
import { BtnDisplayCalendar } from "./Buttons/BtnDisplayCalendar";
import { BtnDisplayShowEvents } from "./Buttons/BtnDisplayShowEvents";
import { useEffect, useRef } from "react";


export const Events =()=>{
    const state = useSelector((state:IGlobalState)=>state.events);
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();
    const wraperRef = useRef(null)

    useEffect(()=>{
        // если selectedDay отсутствует - определяем его
        dispatch(updateSelectedDate(gState.calendar.selectedDay)) 
    },[!gState.events.selectedDate])
    
   
    const display:IDisplay = state.display;
    
    const style = {
        marginTop: window.innerHeight>340? window.innerHeight/4+'px' : 'auto'
    }
    
    return (
        <div className="wraperEvents" ref={wraperRef} style={style}>
            <div className="Events">
                {display.calendar && <Calendar/>}
                {display.showEvents && <ShowEvents/>}
                {display.createEvent && <CreateEvent/>}
            </div>
            <div className="buttonsEvents">
                {(display.calendar || display.showEvents) && <BtnDisplayCreateEvent f={dispatch}/>}
                { display.showEvents && <BtnDisplayCalendar f={dispatch}/>}
                {(display.calendar || display.createEvent) && <BtnDisplayShowEvents f={dispatch}/>}
            </div>
        </div>
        
    )
}