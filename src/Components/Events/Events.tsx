import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import Calendar from "../Calendar/calendar";
import { CreateEvent } from "./CreateEvent";
import './events.scss'
import { ShowEvents } from "./ShowEvents";
import { updateNextDisplayAndSelectedDate, updateSelectedDate } from "../../Redux/Actions/actionCreater";
import { IDisplay } from "../../Redux/redusers/eventReducer";
import { BtnDisplayCreateEvent } from "./Buttons/BtnDisplayCreateEvent";
import { BtnTESTaddEvents } from "./Buttons/BtnTESTaddEvents";
import { BtnDisplayCalendar } from "./Buttons/BtnDisplayCalendar";
import { BtnDisplayShowEvents } from "./Buttons/BtnDisplayShowEvents";
import React, { useRef } from "react";



export const Events =()=>{
    const state = useSelector((state:IGlobalState)=>state.events);
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();
    // если selectedDay отсутствует - определяем его
    !gState.events.selectedDate && dispatch(updateSelectedDate(gState.calendar.selectedDay)) 


    // Есть разница между (selectedDate Календаря) и (selectedDate Событий)  ? 
    const isDateDifference = JSON.stringify(gState.calendar.selectedDay)!== JSON.stringify(state.selectedDate)

    if(isDateDifference && state.nextDisplay) dispatch(updateNextDisplayAndSelectedDate(gState.calendar.selectedDay))
    if(isDateDifference) dispatch(updateSelectedDate(gState.calendar.selectedDay))
    
    const display:IDisplay = state.display;
    
    return (
        <div className="wraperEvents" >
            <div className="Events">
                {display.calendar && <Calendar/>}
                {display.showEvents && <ShowEvents/>}
                {display.createEvent && <CreateEvent/>}
            </div>
            <div className="buttonsEvents">
                {(display.calendar || display.showEvents) && <BtnDisplayCreateEvent f={dispatch}/>}
                { display.showEvents && <BtnTESTaddEvents f={dispatch} state={gState}/>}
                { display.showEvents && <BtnDisplayCalendar f={dispatch}/>}
                {(display.calendar || display.createEvent) && <BtnDisplayShowEvents f={dispatch}/>}
            </div>
        </div>
        
    )
}