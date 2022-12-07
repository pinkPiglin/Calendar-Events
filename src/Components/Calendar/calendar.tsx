import {BuildDays, dayIsSelected, getNameMonth, IDay,} from './buildDate'
import './calendar.scss'
import {useDispatch, useSelector } from 'react-redux'
import { handlerAssignActiveDate, handlerNextMonth, handlerPrevMonth, updateDayInMonth } from '../../Redux/Actions/actionCreater';
import { IDefaultState } from '../../Redux/redusers/calendarResucer';

export default function Calendar(){
    const state:IDefaultState = useSelector((state: {[key:string]:any})=> state.calendar)
    const dispatch = useDispatch();
    const days:IDay[] = BuildDays();

    function AssignSelectedDate(year:number, month:number, day:number):void{
        dispatch(handlerAssignActiveDate(year, month, day));
    }
    function drawDays(days:IDay[]):JSX.Element[]{
        console.log(state)
        return days.map((el, i)=> 
        (<div 
            className={dayIsSelected(state, el)? 'isActive':''}
            key={i}
            onClick={()=>{AssignSelectedDate(el.year, el.month, el.day)}}
            >
            {el.day}
        </div>))
    }

    return(
        <div className="calendar">
            <div className='calendarHeader'>
                <h2>{state.year}</h2>
                <h3> {getNameMonth(state.month)} </h3>
                <div>
                    <button onClick={()=>{dispatch(handlerPrevMonth()); dispatch(updateDayInMonth())}}>{'<'}</button>
                    <button  onClick={()=>{dispatch(handlerNextMonth()); dispatch(updateDayInMonth())}}>{'>'}</button>
                </div>
            </div>
            <table className='weekDays'>
                <thead>
                    <tr>
                        <td>ПН</td>
                        <td>ВТ</td>
                        <td>СР</td>
                        <td>ЧТ</td>
                        <td>ПТ</td>
                        <td>СБ</td>
                        <td>ВС</td>
                    </tr>

                </thead>
            </table>
           <div className="monthDays">{drawDays(days)}</div>
        </div>
    )
}