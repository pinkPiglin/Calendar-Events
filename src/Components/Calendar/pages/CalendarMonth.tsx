import { useDispatch, useSelector } from "react-redux";
import { handlerDisplayDays, handlerNextYear, handlerPrevYear, handlerDisplayYears} from "../../../Redux/Actions/actionCreater";
import { IDefaultState } from "../../../Redux/redusers/calendarResucer";
import { getNameMonth, IGlobalState } from "../buildDate";
import '.././calendar.scss'
import { Today } from "../Today";

interface IMonth{
    name:string
    Y:number
    M:number
    isNextYear?:boolean
}

function createMonths(state:IDefaultState):IMonth[]{
    const result=[];
    for(let i=0; i<=11; i++){
        const month:IMonth={
            name:getNameMonth(i, 'big'),
            Y:state.year,
            M:i
        }
        result.push(month)
    }
    for(let i=0; i<=3; i++){
        const month:IMonth={
            name:getNameMonth(i, 'big'),
            Y:state.year+1,
            M:i,
            isNextYear:true
        }
        result.push(month)
    }
    return result
}

export const ChooseMonth=()=>{
    const state = useSelector((state:IGlobalState)=> state.calendar);
    const dispatch = useDispatch();
    const months:IMonth[]=createMonths(state);
    console.log(months)
    function clsMonth(el:IMonth):string{
        const arr= [
            el.isNextYear? 'colorGray':'',
            (el.Y===state.today.Y ) &&( el.M ===state.today.M) ? 'isActive' : ''
        ]
        return arr.join(' ')
    }
    
    return(
        <div className="choosMonth">
            <Today/>
            <div className="calendarHeader">
                <div className="year-month" onClick={()=>dispatch(handlerDisplayYears())}>{state.year}</div>
                <div>
                    <button className="btn-leafCalendar" onClick={()=>dispatch(handlerPrevYear())}>{'<'}</button>
                    <button className="btn-leafCalendar" onClick={()=> dispatch(handlerNextYear())}>{'>'}</button>
                </div>
            </div>
            <div className='line'></div>
            <div className="months">
                {months.map((el, i)=>(
                    <div key={i} className={clsMonth(el)} onClick={()=> dispatch(handlerDisplayDays(el.Y, el.M))}>
                        {el.name.slice(0,3)}
                    </div>
                ))}
            </div>
        </div>
    )
}