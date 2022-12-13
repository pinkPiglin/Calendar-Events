import { useSelector } from "react-redux";
import { IDefaultState } from "../../Redux/redusers/calendarResucer";
import { IEventState } from "../../Redux/redusers/eventReducer";

export interface IDay {
    day: number
    month:number
    year:number
    isActive:boolean
    tasks?:[]
    isPrevMothDay?:boolean,
    isNextMonthDay?:boolean
}

export interface Y{
    Y:number
}
export interface Y_M extends Y{
    M:number
}
export interface Y_M_D extends Y_M{
    D:number
}
export interface IGlobalState{
    calendar:IDefaultState
    events:IEventState
}

export const nextMonthOfThisYear =(month:number)=> month+1 !== 12? true : false 
export const prevMonthOfThisYear =(month:number)=>  month-1 >=0 ? true : false

function getLostDaysOfPrevMonth(year:number,month:number,dateofWeek:number):IDay[]{
    const result= [];
        let daysOfprevMonth = getdaysInMonth(
            prevMonthOfThisYear(month)? year : year-1,
            prevMonthOfThisYear(month)? month-1: 11
        );
        const b = dateofWeek!==0? dateofWeek-1: 6;
        for(let i =0;i<b; i++){
            const day:number = i===0? daysOfprevMonth: daysOfprevMonth -i;
            const date:IDay={
                day:day,
                month: prevMonthOfThisYear(month) ? month -1 : 11,
                year: prevMonthOfThisYear(month) ? year: year-1, 
                isActive:false,
                isPrevMothDay:true
            }
            result.unshift(date)
        } 
    return result
}

function getStartDaysOfNextMonth(year:number,month:number,dateofWeek:number):IDay[]{
    const result= [];
        for(let i=1; i< 8 -dateofWeek; i++){
            const date:IDay={
                day: i,
                month: nextMonthOfThisYear(month)? month +1 : 0,
                year: nextMonthOfThisYear(month)? year: year+1, 
                isActive:false,
                isNextMonthDay:true
            }
            result.push(date)
        } 
        return result
}

function getArrayOfDays(state:IDefaultState):IDay[] {
    const {year,month,daysInMonth} = state;
    const result:IDay[] =[];
    const dateofWeek =(day:number)=> getDateOfWeek({Y:year,M:month,D:day});
    
    if(dateofWeek(1)!==1){ //Первое число месяца != Понедельник?
        const lastDaysOfPrevMonth:IDay[] = getLostDaysOfPrevMonth(year, month, dateofWeek(1));
        lastDaysOfPrevMonth?.forEach(el=> result.push(el) );
    }

    for(let d =1; d<=daysInMonth; d++){ 
        const date:IDay={
            day:d,
            month,
            year,
            isActive:false
        }
        result.push(date)
    }

    if(dateofWeek(daysInMonth) !==0){ // Последний день месяца != Воскресенье?
       const startDaysOfNextMonth:IDay[]= getStartDaysOfNextMonth(year, month, dateofWeek(daysInMonth));
       startDaysOfNextMonth.forEach(el=> result.push(el))
    }

    return result
}

function getDateOfWeek({Y,M,D}:Y_M_D):number{
    return new Date(Y, M, D).getDay()
}
type arg= 'big' | 'small';

export  function getNameMonth(month:number,type:arg):string{
    const nameMonth = [
        {big:'Январь',small:'января'},
        {big:'Февраль',small:'февраля'},
        {big:'Март',small:'марта'},
        {big:'Апрель',small:'апреля'},
        {big: 'Май',small:'мая'},
        {big:'Июнь' ,small:'июня'},
        {big:'Июль' ,small:'июля'},
        {big:'Август' ,small:'августа'},
        {big:'Сентябрь' ,small:'сентября'},
        {big:'Октябрь' ,small:'октября'},
        {big:'Ноябрь' ,small:'ноября'},
        {big:'Декабрь' ,small:'декабря'},
    ]
    return nameMonth[month][type]
}

export  const getdaysInMonth=(year:number, month:number): number=>
    [27,28,29,30,31,32].reduce((acc, day)=> {
        if(day !== new Date(year, month, day).getDate() && !acc){
            acc=day-1
        }
        return acc
    },0)
export function dayIsSelected(state:IDefaultState, objOfDay:IDay):boolean{
    return state.selectedDay.Y===objOfDay.year && state.selectedDay.M === objOfDay.month && state.selectedDay.D===objOfDay.day
}
export const BuildDays =()=>{
    const state:IDefaultState =  useSelector((state:IGlobalState)=> state.calendar)
    const days: IDay[] = getArrayOfDays(state);

    console.log(days)
    return days
}