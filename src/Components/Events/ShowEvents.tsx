import { useDispatch, useSelector } from "react-redux"
import {useEffect} from 'react'
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer";
import { IGlobalState } from "../Calendar/buildDate";
import { getDateFormat_W_D_M} from "../Calendar/calendar";
import {handlerdeleteEvent, handlerDisplayCreateEvent, handlerEditEvent, handlerSaveChangedEvent} from "../../UI/UIShowEvents/UIShowEvents";
import { Dispatch } from "redux";
import { cacheEditableEventText, rememberPimaryText, resetSelectedEvent, saveChangedEvent } from "../../Redux/Actions/actionCreater";

function isEditableElement(state:IEventState, id:number):boolean{
    console.log( 'isEditableElement ',state.showEvents.edit.id === `CreatedEvent${id}` ? true: false)
    return state.showEvents.edit.id === `CreatedEvent${id}` ? true: false
}
function drowEvents(events:IEvent[], gState:IGlobalState, dispatch: Dispatch):JSX.Element[]{
    function addClsBtn(id:string):string{
        const clsBtn = ['editEvent']
        if(gState.events.showEvents.edit.id === `CreatedEvent${id}`){
            clsBtn.push('confirmSave')
        }
        return clsBtn.join(' ')
    }
    return events.map((event:IEvent, i)=>{
        return(
            <div key={i} className="event">

                <div className="time">{event.time}</div>

                <div className="text">
                    
                    <textarea 
                        id={`CreatedEvent${i}`}
                        value={isEditableElement(gState.events, i)? gState.events.showEvents.edit.text: event.text} 
                        onChange={(e)=>dispatch(cacheEditableEventText(e.target.value))}
                        rows={2}
                        
                        disabled={!isEditableElement(gState.events, i)}
                        autoFocus={isEditableElement(gState.events, i)}

                        onFocus={()=>dispatch(rememberPimaryText(event.text))}
                        // onBlur={()=>dispatch(resetSelectedEvent())}
                    ></textarea>
                </div>

                <div className="uiEvent">
                    {!isEditableElement(gState.events, i)?
                        <>
                            <button className='editEvent' onClick={()=>handlerEditEvent(`CreatedEvent${i}`, gState.events, dispatch )}></button>
                            <button className="deleteEvent" onClick={()=>handlerdeleteEvent(i, events, dispatch)} ></button>
                        </>
                        :
                        <>
                            <button className='editEvent confirmSave' onClick={()=>handlerSaveChangedEvent(gState.events, dispatch, i)}></button> 
                            <button className="deleteEvent cancel" onClick={()=>dispatch(resetSelectedEvent())} ></button> 
                        </>
                          
                    }
                    
                </div>

            </div>
        )
    })
}

export const ShowEvents =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const events =gState.events.events
    const dispatch = useDispatch();

    useEffect(()=>{
        const id = gState.events.showEvents.edit.id;
        if(id!==''){
            const textarea = document.getElementById(id)!;
            textarea.focus()
        }
    })
 
    return (
        <div className="ShowEvents">

            <div className="headerEvents">
                <h4>{getDateFormat_W_D_M(gState.calendar.selectedDay)}</h4>
            </div>

            <div className="listEvents">
                {events.length>0? drowEvents(events, gState, dispatch): <div className="noEvents">Нет событий</div>}
            </div>

            <button onClick={()=>handlerDisplayCreateEvent(dispatch)} className="addEvent"> </button>

        </div>
    )
}