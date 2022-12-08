import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import { getDateFormat_W_D_M} from "../Calendar/calendar";
import './events.scss'
import { ShowEvents } from "./ShowEvents";


export const Events =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();

    return (
        <div className="Events">
            <ShowEvents/>
        </div>
    )
}