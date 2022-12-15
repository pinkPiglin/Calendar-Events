import { Dispatch } from "redux";
import { handlerDisplayCreateEvent } from "../../../UI/UIShowEvents/UIShowEvents"

export type IpropsBtn={
    f: Dispatch
}
export const BtnDisplayCreateEvent = ({f}:IpropsBtn):JSX.Element=>{
    return(
        <button onClick={()=>handlerDisplayCreateEvent(f)} className="addEvent addEventFromDate"> </button>
    )
}