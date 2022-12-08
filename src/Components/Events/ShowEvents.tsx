import { useDispatch, useSelector } from "react-redux"
import { IGlobalState } from "../Calendar/buildDate";
import { getDateFormat_W_D_M} from "../Calendar/calendar";


export const ShowEvents =()=>{
    const gState = useSelector((state:IGlobalState)=>state);
    const dispatch = useDispatch();
    const events =[]
    // function drowSelectedDay(){
    //     const day={
    //         Y:gState.calendar.selectedDay.Y,
    //         M: gState.calendar.selectedDay.M,
    //         D:gState.calendar.selectedDay.D
    //     }
    //     const week = new Date(day.Y, day.M, day.D).getDay()
    //     let result = `${weekDays[week].big.toLowerCase}, ${}`

    // }
    return (
        <div className="ShowEvents">
            <div className="headerEvents">
                <h4>{getDateFormat_W_D_M(gState.calendar.selectedDay)}</h4>
            </div>
            <main className="listEvents">
                <div className="event">
                    <div className="time">14:00</div>
                    <div className="text">путин Хуйло</div>
                    <div className="uiEvent">
                        <button className="editEvent"></button>
                        <button className="deleteEvent"></button>
                    </div>
                </div>
                <div className="event">
                    <div className="time">14:00</div>
                    <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, expedita?</p>
                    <div className="uiEvent">
                        <button className="editEvent"></button>
                        <button className="deleteEvent"></button>
                    </div>
                </div>
               
            </main>
            <button className="addEvent"> </button>
           
        </div>
    )
}