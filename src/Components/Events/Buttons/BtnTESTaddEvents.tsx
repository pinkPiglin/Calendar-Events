import { Dispatch } from "redux"
import { handlerCreateAnyEvents } from "../../../UI/UIShowEvents/UIShowEvents"
import { IGlobalState } from "../../Calendar/buildDate"


type Btn={
    f:Dispatch,
    state:IGlobalState
}


export const BtnTESTaddEvents =({f, state}:Btn)=>{
    return(
        <button
        className="button testBtn "
        onClick={()=>handlerCreateAnyEvents(f, state.events.selectedDate!)} > + 10</button>
    )
}