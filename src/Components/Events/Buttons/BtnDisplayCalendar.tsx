import { displayCalendar, displayShowEvents } from "../../../Redux/Actions/actionCreater"
import { IpropsBtn } from "./BtnDisplayCreateEvent"

export const BtnDisplayCalendar=({f}:IpropsBtn)=>{
    return(
        <button
        
        className="btnDispCalendar button"
        onClick={()=>f(displayCalendar())}
        ></button>
    )
}