import { useDispatch, useSelector } from "react-redux"
import {  OnchangeEventValue, OnChangeTimeEvent, deleteErrorMessage, showСalendarЕemporarily, updateNextDisplayAndSelectedDate } from "../../Redux/Actions/EventsActionCreater";
import { getNameMonth, IGlobalState } from "../Calendar/buildDate";
import {useEffect} from 'react'
import { GetAllEvents, PostOneEvent } from "../../Redux/Actions/AsyncActions";
import { IEvent } from "../../Redux/redusers/eventReducer";

function drowError(error:string):JSX.Element{
    return (<p>{error}</p>)
}
export const CreateEvent =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();
    const userId = gState.auth.user!.id
      const event:IEvent={
        text:gState.events.createEvent.text,
        date: gState.calendar.selectedDay,
        time:gState.events.createEvent.time
    }
    useEffect(()=>{
         // если есть разница в выбранном дне между календарем и событиями
        if(JSON.stringify(gState.events.selectedDate)!== JSON.stringify(gState.calendar.selectedDay)){
            console.log('UPDATE CreateEvents')
            dispatch(updateNextDisplayAndSelectedDate(gState.calendar.selectedDay))
        }    
    })


    return (
        <div className="CreateEvent">
            
            <div className="writeEventName">
                <label >Добавьте название </label>
                <textarea 
                    autoFocus
                    required 
                    onFocus={()=>dispatch(deleteErrorMessage())}
                    value={gState.events.createEvent.text} 
                    onChange={(e)=>dispatch(OnchangeEventValue(e.target.value))}> 
                </textarea>
                
            </div>
            <div className="wraperDateEvent">
                <div className="dateEvent"
                onClick={()=>dispatch(showСalendarЕemporarily(gState.calendar.selectedDay, {calendar:false, showEvents:false, createEvent:true}))}
                >
                    {
                    `${gState.calendar.selectedDay.D} 
                    ${getNameMonth(gState.calendar.selectedDay.M, 'small').slice(0, 3)} 
                    ${gState.calendar.selectedDay.Y}`
                }</div>
                <div className="timeEvent">
                    <input 
                        type='time' 
                        value={gState.events.createEvent.time} 
                        onChange={(e)=>dispatch(OnChangeTimeEvent(e.target.value))}
                        onFocus={()=>dispatch(deleteErrorMessage())}
                        />
                </div>
            </div>
            <div className="errorUserMessage">
            {gState.events.createEvent.userError.name ? drowError(gState.events.createEvent.userError.name) : null}

            </div>
            <button onClick={()=>PostOneEvent(userId, event,gState.events.createEvent.text.trim())(dispatch)} className="saveEvent">Cохранить</button>
        </div>
    )
}