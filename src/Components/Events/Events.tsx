import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import Calendar, { getDateFormat_W_D_M} from "../Calendar/calendar";
import { CreateEvent } from "./CreateEvent";
import './events.scss'
import { ShowEvents } from "./ShowEvents";
import { handlerDisplayCreateEvent } from "../../UI/UIShowEvents/UIShowEvents";


export const Events =()=>{
    const state = useSelector((state:IGlobalState)=>state.events);
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();

    const isDateDifference = JSON.stringify(gState.calendar.selectedDay)!== JSON.stringify(state.selectedDate)
    const display = isDateDifference && state.nextDisplay? state.nextDisplay : state.display;

   
    return (
        <div className="Events">
            {display.calendar && <Calendar/>}
            {display.showEvents && <ShowEvents/>}
            {display.createEvent && <CreateEvent/>}
            {display.calendar && <button onClick={()=>handlerDisplayCreateEvent(dispatch)} className="addEvent addEventFromDate"> </button>}
        </div>
    )
}