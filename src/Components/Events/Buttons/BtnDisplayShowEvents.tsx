import { displayShowEvents } from "../../../Redux/Actions/actionCreater"
import { IpropsBtn } from "./BtnDisplayCreateEvent"

export const BtnDisplayShowEvents = ({f}:IpropsBtn)=>{
    return(
        <button 
        className="btnDispShowEvents"
        onClick={()=>f(displayShowEvents())}
        >Показать события</button>
    )
}