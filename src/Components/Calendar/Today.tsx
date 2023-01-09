import { useDispatch, useSelector} from "react-redux"
import { handlerToday } from "../../Redux/Actions/CalendarActionCreater";
import { getDateFormat_W_D_M } from "./calendar";
import { IGlobalState } from "./buildDate";

export const Today =()=>{
    const state = useSelector((state:IGlobalState) => state.calendar);
    const dispatch = useDispatch();
    return(
        <div className='today' onClick={()=>dispatch(handlerToday())}>{getDateFormat_W_D_M(state.today)}</div>
    )
}