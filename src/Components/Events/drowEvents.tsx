import { Dispatch } from "redux"
import { DeleteOneEvent } from "../../Redux/Actions/AsyncActions"
import { cacheEditableEventText, rememberPimaryText, resetSelectedEvent } from "../../Redux/Actions/EventsActionCreater"
import { IEvent, IEventState } from "../../Redux/redusers/eventReducer"
import {handlerdeleteEvent, handlerEditEvent, handlerSaveChangedEvent } from "../../UI/UIShowEvents/UIShowEvents"
import { IGlobalState } from "../Calendar/buildDate"

function isEditableElement(state:IEventState, id:string):boolean{  // подлежит ли редактированию переданное событие по ID  
    return state.showEvents.edit.id === id ? true: false
}
export function drowEvents(events:IEvent[], gState:IGlobalState, dispatch: Dispatch):JSX.Element[]{
    return events.map((event:IEvent, i)=>{
       return(
           <div key={i} className="event">

               <div className="time">{event.time}</div>

               <div className="text">
                   
                   <textarea 
                       id={event._id}
                       value={isEditableElement(gState.events, event._id!)? gState.events.showEvents.edit.text: event.text} 
                       onChange={(e)=>dispatch(cacheEditableEventText(e.target.value))}
                       rows={2}
                       
                       disabled={!isEditableElement(gState.events, event._id!)} 
                       autoFocus={isEditableElement(gState.events, event._id!)}

                       onFocus={()=>dispatch(rememberPimaryText(event.text))}
                       // onBlur={()=>setTimeout(dispatch(resetSelectedEvent()), 2)}
                   ></textarea>
               </div>

               <div className="uiEvent">
                   {!isEditableElement(gState.events, event._id!)?
                       <>
                           <button className='editEvent' onClick={()=>handlerEditEvent(event._id!, gState.events, dispatch )}></button>
                           <button className="deleteEvent" onClick={()=>handlerdeleteEvent(gState.auth.user?.id!, event._id!, dispatch)} ></button>
                       </>
                       :
                       <>
                           <button className='editEvent confirmSave' onClick={()=>handlerSaveChangedEvent(gState, dispatch, event._id!)}></button> 
                           <button className="deleteEvent cancel" onClick={()=>dispatch(resetSelectedEvent())} ></button> 
                       </> 
                   }  
               </div>
           </div>
       )
   })
}