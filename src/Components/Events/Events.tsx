import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import Calendar, { getDateFormat_W_D_M} from "../Calendar/calendar";
import { CreateEvent } from "./CreateEvent";
import './events.scss'
import { ShowEvents } from "./ShowEvents";


export const Events =()=>{
    const state = useSelector((state:IGlobalState)=>state.events);
    const dispatch = useDispatch();

    return (
        <div className="Events">
            {state.display.calendar && <Calendar/>}
            {state.display.showEvents && <ShowEvents/>}
            {state.display.createEvent && <CreateEvent/>}
        </div>
    )
}