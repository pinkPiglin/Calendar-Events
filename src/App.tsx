
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Events } from './Components/Events/Events';
import RequireAuth from './hoc/RequireAuth';
import LoginPage from './Pages/loginPage/loginPage';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IGlobalState } from './Components/Calendar/buildDate';
function App() {
  const gState = useSelector((state:IGlobalState)=>state);

  useEffect(()=>{
      const loginName = gState.auth.user?.login!
      const events = gState.events.events
      gState.auth.user && localStorage.setItem(loginName, JSON.stringify(events))
  },[gState.events.events  ])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Events/>
          </RequireAuth>
        } />
        <Route path='login' element={<LoginPage/>}/>
      </Routes>
    </div>
  )
}

export default App;
