import { Dispatch } from "redux"
import { cacheEditableEventText, rememberPimaryText, resetSelectedEvent } from "../../Redux/Actions/actionCreater"
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer"
import { handlerdeleteEvent, handlerEditEvent, handlerSaveChangedEvent } from "../../UI/UIShowEvents/UIShowEvents"
import { IGlobalState } from "../Calendar/buildDate"

function isEditableElement(state:IEventState, id:number):boolean{  // подлежит ли редактированию переданное событие по ID  
    return state.showEvents.edit.id === `CreatedEvent${id}` ? true: false
}
export function drowEvents(events:IEvent[], gState:IGlobalState, dispatch: Dispatch):JSX.Element[]{
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
                       // onBlur={()=>setTimeout(dispatch(resetSelectedEvent()), 2)}
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