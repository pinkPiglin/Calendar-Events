
import './App.css';
import {Route, Routes} from 'react-router-dom'
import { Layout } from './Layout';
import CreateTask from './Pages/CreateTask';
import AllTasks from './Pages/AllTasks/allTasks';

function App() {
  return (
    <div className='App'>
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='createTask' element={<CreateTask/>}/>
          <Route path='allTasks' element={<AllTasks/>}/>
        </Route>
        
    </Routes>
    </div>
  )
}

export default App;
