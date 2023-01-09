import {useDispatch, useSelector } from 'react-redux'
import { handlerAssignActiveDate, handlerNextMonth, handlerPrevMonth, handlerToday, updateDayInMonth, handlerDisplayMonth } from '../../../Redux/Actions/CalendarActionCreater';
import {BuildDays, dayIsSelected, getNameMonth, IDay, IGlobalState} from '.././buildDate'
import { IDefaultState } from '../../../Redux/redusers/calendarResucer';
import { weekDays, getDateFormat_W_D_M } from '../calendar';
import { Today } from '../Today';
import { updateNextDisplayAndSelectedDate, updateSelectedDate } from '../../../Redux/Actions/EventsActionCreater';
import { Dispatch } from 'redux';

function clsForDay (el:IDay, state:IDefaultState):string{
    const arr =[
        'day',
        dayIsSelected(state, el)? 'isActive':'',
        el.isNextMonthDay|| el.isPrevMothDay? 'colorGray': ''
    ]
    return arr.join(' ')
}

function AssignSelectedDate(year:number, month:number, day:number, dispatch:Dispatch, gState:IGlobalState):void{
    dispatch(handlerAssignActiveDate(year, month, day));
    if(gState.events.nextDisplay) {// делаем это для Event
        dispatch(updateNextDisplayAndSelectedDate({Y:year, M:month, D:day})) 
    }
    dispatch(updateSelectedDate({Y:year, M:month, D:day}))
}

function drawDays(days:IDay[], gState:IGlobalState, dispatch:Dispatch):JSX.Element[]{
    return days.map((el, i)=> 
    (
        <div className="day" key={i}>
            <div 
                className={clsForDay(el, gState.calendar)}
                key={i}
                onClick={()=>{AssignSelectedDate(el.date.Y, el.date.M, el.date.D, dispatch, gState)}}
                >
                {el.date.D}
            </div>
            <span className={el.tasks && el.tasks.length>0? 'pointEvent': 'noPointEvent' }></span>
        </div>
    ))
}

export const CalendarDays=()=>{
    const state:IDefaultState = useSelector((state: {[key:string]:any})=> state.calendar)
    const dispatch = useDispatch();
    const days:IDay[] = BuildDays();
    const gState = useSelector((state:IGlobalState)=>state)

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
           <div className="monthDays">{drawDays(days, gState, dispatch)}</div>
        </div>
    )
}