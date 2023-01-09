import { displayCalendar } from "../../../Redux/Actions/EventsActionCreater"
import { IpropsBtn } from "./BtnDisplayCreateEvent"

export const BtnDisplayCalendar=({f}:IpropsBtn)=>{
    return(
        <button
        
        className="btnDispCalendar button"
        onClick={()=>f(displayCalendar())}
        ></button>
    )
}