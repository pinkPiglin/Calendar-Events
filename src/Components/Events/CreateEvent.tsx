import { useDispatch, useSelector } from "react-redux"
import {  OnchangeEventValue, OnChangeTimeEvent, deleteErrorMessage, showСalendarЕemporarily, updateNextDisplayAndSelectedDate } from "../../Redux/Actions/actionCreater";
import { getNameMonth, IGlobalState } from "../Calendar/buildDate";
import { handlerSaveEvent } from "../../UI/UICreateEvents/UICreateEvent";
import {useEffect} from 'react'

function drowError(error:string):JSX.Element{
    return (<p>{error}</p>)
}
export const CreateEvent =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();
    const events = gState.events.events
    useEffect(()=>{
        if( // если сейчас отображается Не календарь &&  есть разница в выбранном дне между календарем и событиями
            (gState.events.display.calendar === false) &&
            ( JSON.stringify(gState.events.selectedDate)!== JSON.stringify(gState.calendar.selectedDay) )
        )
        {
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
            <button onClick={()=>handlerSaveEvent(gState, events, dispatch)} className="saveEvent">Cохранить</button>
        </div>
    )
}