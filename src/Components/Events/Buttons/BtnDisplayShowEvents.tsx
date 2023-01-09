import { displayShowEvents } from "../../../Redux/Actions/EventsActionCreater"
import { IpropsBtn } from "./BtnDisplayCreateEvent"

export const BtnDisplayShowEvents = ({f}:IpropsBtn)=>{
    return(
        <button 
        className="button btnDispShowEvents"
        onClick={()=>f(displayShowEvents())}
        ></button>
    )
}