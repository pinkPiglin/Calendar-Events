import { Dispatch } from "redux"
import { handlerCreateAnyEvents } from "../../../UI/UIShowEvents/UIShowEvents"
import { IGlobalState } from "../../Calendar/buildDate"


type Btn={
    f:Dispatch,
    state:IGlobalState
}


export const BtnTESTaddEvents =({f, state}:Btn)=>{
    return(
        <button onClick={()=>handlerCreateAnyEvents(f, state.events.selectedDate!)} > + 20</button>
    )
}