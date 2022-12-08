import { useDispatch, useSelector } from "react-redux";
import { handlerGoToMonth, handlerChangeYear } from "../../../Redux/Actions/actionCreater";
import { Today } from "../../Today";
import { IGlobalState } from "../buildDate";



function getYears(year:number):number[]{
    const arr=[];
    let b = year-4;
    for(let i=b; i<=b+15; i++){
        arr.push(i)
    }
    console.log(arr)
    return arr
}
export const CalendarYears=()=>{
    const state = useSelector((state:IGlobalState)=>state.calendar);
    const dispatch = useDispatch();
    const years = getYears(state.year);

    function handlerOnClick(to:number){
        dispatch(handlerChangeYear(state.year +to))
    }
    return(
        <div className="choosMonth">
            <Today />
            <div className="calendarHeader">
                <div className="year-month">{`${years[0]} - ${years[years.length-1]}`}</div>
                <div>
                    <button className="btn-leafCalendar" onClick={()=> state.year > state.today.Y -30 && handlerOnClick(-10)}>{'<'}</button>
                    <button className="btn-leafCalendar" onClick={()=> state.year < state.today.Y +30 && handlerOnClick(10)}>{'>'}</button>
                </div>
            </div>
            <div className='line'></div>
            <div className="months">
                {years.map((Y, i)=>(
                    <div key={i} onClick={()=> dispatch(handlerGoToMonth(Y))} className={Y===state.today.Y? 'isActive': ''}>
                        {Y}
                    </div>
                ))}
            </div>
        </div>
    )
}
