import {useDispatch, useSelector } from 'react-redux'
import { handlerAssignActiveDate, handlerNextMonth, handlerPrevMonth, handlerToday, updateDayInMonth, handlerDisplayMonth } from '../../../Redux/Actions/actionCreater';
import {BuildDays, dayIsSelected, getNameMonth, IDay} from '.././buildDate'
import { IDefaultState } from '../../../Redux/redusers/calendarResucer';
import { weekDays, getDateFormat_W_D_M } from '../calendar';
import { Today } from '../../Today';


export const CalendarDays=()=>{
    const state:IDefaultState = useSelector((state: {[key:string]:any})=> state.calendar)
    const dispatch = useDispatch();
    const days:IDay[] = BuildDays();

    function clsForDay (el:IDay):string{
        const arr =[
            dayIsSelected(state, el)? 'isActive':'',
            el.isNextMonthDay|| el.isPrevMothDay? 'colorGray': ''
        ]
        return arr.join(' ')
    }

    function AssignSelectedDate(year:number, month:number, day:number):void{
        dispatch(handlerAssignActiveDate(year, month, day));
    }
    function drawDays(days:IDay[]):JSX.Element[]{
        console.log(state)
        return days.map((el, i)=> 
        (<div 
            className={clsForDay(el)}
            key={i}
            onClick={()=>{AssignSelectedDate(el.year, el.month, el.day)}}
            >
            {el.day}
            
        </div>))
    }
   
    return(
        <div className="calendarDays">
            <Today/>
            <div className='calendarHeader'>
                <div className='year-month' onClick={()=>dispatch(handlerDisplayMonth())}> {getNameMonth(state.month, 'big')} {state.year}</div>
                <div>
                    <button className='btn-leafCalendar' onClick={()=>{dispatch(handlerPrevMonth()); dispatch(updateDayInMonth())}}>{'<'}</button>
                    <button className='btn-leafCalendar' onClick={()=>{dispatch(handlerNextMonth()); dispatch(updateDayInMonth())}}>{'>'}</button>
                </div>
            </div>
            <div className='line'></div>
            <div className='weekDays'>
               {weekDays.map((el, i)=> (<div key={i}>{i<6? weekDays[i+1].big: weekDays[0].big}</div>))}
            </div>
           <div className="monthDays">{drawDays(days)}</div>
        </div>
    )
}