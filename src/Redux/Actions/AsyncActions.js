
import axios from 'axios';
import { assignValidity, authUser } from './AuthAtionCreater';
import { fetchEvents, handlerPushNewEvent, recordErrorMessage, saveChangedEvent } from './EventsActionCreater';




axios.defaults.headers.common['Accept']='application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json'
// axios.defaults.baseURL = 'http://localhost:5001/api';
axios.defaults.baseURL = 'https://first-server.herokuapp.com/api';

export const GetAllEvents =(userId) =>{
    return async dispatch=>{
        try{
            await axios.get(`/events/${userId}`)
              .then((res)=> {
                if(res.status ===200){
                  //kas
                  dispatch(fetchEvents(res.data))
                }
                else{
                  dispatch(fetchEvents([]))
                }
              })
        }catch(e){
            console.error('error',e)
        }
    }
}
export const PostOneEvent = (userId, event, text) =>{
    return async dispatch=>{
        try{
          if(text===''){ //Если пользователь не ввел текст
            dispatch(recordErrorMessage('Введите название'))
            return
          }
          await axios
            .post(`/events/addOne/${userId}`, {event})
            .then(res=> {
              if(res.status==200){
                dispatch(GetAllEvents(userId))
                dispatch(handlerPushNewEvent())
              }
              else{
                dispatch(recordErrorMessage('По этому времени уже есть событие. Выберите другое время.'))
              }
            })
        }catch(e){
            console.error(e)
        }
    }
}
export const PostManyEvents = () =>{
    return dispatch=>{
        try{
            axios.get('/user', {
                params: {
                  ID: 12345
                }
              })
              .then(function (response) {
                console.log(response);
              })
        }catch(e){
            console.error(e)
        }
    }
}
export const PutEvent = (userId, id, newValue) =>{
    return async dispatch=>{
        try{
            await axios.post(`/events/edit/${userId}`, {id, newValue})
              .then(res=> {
                dispatch(saveChangedEvent())
              })
        }catch(e){
            console.error('error',e)
        }
    }
}

export const DeleteOneEvent = (userId, id) =>{
    return async dispatch=>{
        try{
            await axios.delete(`/events/delete`,{data:{userId, id}})
        }catch(e){
            console.error(e)
        }
    }
}

export const authOnServer = (login, password, sucses)=>{
 
  
  return  async dispatch => {
    try{
        await axios
          .post(`/users/signIn`, {login,password})
          .then(res=>{
            if(res.status === 200){
              const {_id:id, name, login, password} = res.data
              dispatch(authUser({id, name}))
              sucses({login, password, id})
            }
            else{
              dispatch(assignValidity(false))
            }
          })
    }catch(e){
        console.error('error',e)
    }
}
}

