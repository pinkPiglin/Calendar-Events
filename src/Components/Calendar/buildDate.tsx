import { useSelector } from "react-redux";
import { IDefaultState } from "../../Redux/redusers/calendarResucer";

export interface IDay {
    day: number
    month:number
    year:number
    isActive:boolean
    tasks?:[]
    isPrevMothDay?:boolean,
    isNextMonthDay?:boolean
}

interface Y{
    year:number
}
interface Y_M extends Y{
    month:number
}
interface Y_M_D extends Y_M{
    day:number
}
interface Calendar{
    calendar:IDefaultState
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
    const dateofWeek =(day:number)=> getDateOfWeek({year,month,day:day});
    
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

function getDateOfWeek({year,month,day}:Y_M_D):number{
    return new Date(year, month, day).getDay()
}

export  function getNameMonth(month:number):string{
    const nameMonth = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
    ]
    return nameMonth[month]
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
    const state:IDefaultState =  useSelector((state:Calendar)=> state.calendar)
    const days: IDay[] = getArrayOfDays(state);

    console.log(days)
    return days
}