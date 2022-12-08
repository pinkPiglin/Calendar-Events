import {getNameMonth} from './buildDate';
import { useSelector } from 'react-redux';
import './calendar.scss'
import { IDefaultState } from '../../Redux/redusers/calendarResucer';
import { ChooseMonth } from './pages/CalendarMonth';
import { CalendarDays } from './pages/CalendarDays';
import { CalendarYears } from './pages/CalendarYears';

export interface IWeekdays{
    big:string
    small:string
}
export const weekDays:IWeekdays[]=[
    {big:'ВС', small:'воскресенье'},
    {big:'ПН', small:'понедельник'},
    {big:'ВТ', small:'вторник'},
    {big:'СР', small:'среда'},
    {big:'ЧТ', small:'четверг'},
    {big:'ПТ', small:'пятница'},
    {big:'СБ', small:'суббота'}
]
export function getDateFormat_W_D_M(state:IDefaultState):string{
    const {Y, M, D} = state.today;
    const nameWeek= weekDays[new Date(Y,M,D).getDay()].small;
    return `${nameWeek}, ${D} ${getNameMonth(M, 'small')}`
}

export default function Calendar(){
    const state:IDefaultState = useSelector((state: {[key:string]:any})=> state.calendar)
    return(
        <>
        {state.display.days? <CalendarDays/>:null}
        {state.display.months? <ChooseMonth/> : null}
        {state.display.years? <CalendarYears/> : null}
        </>
    )
}
git commit -m 'Calendar is done'