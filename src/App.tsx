
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Events } from './Components/Events/Events';
import RequireAuth from './hoc/RequireAuth';
import LoginPage from './Pages/loginPage/loginPage';

function App() {
  return (
    <div className='App' >
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
