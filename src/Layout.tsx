import {NavLink, Outlet} from 'react-router-dom'

export const Layout=()=>{
    return(
        <div>
            <header>
                <h1>To <span>Do</span></h1>
                <nav>
                    <button><NavLink to={'createTask'}>Добавить  задачу</NavLink></button>
                    <button><NavLink to={'allTasks'}>Все задачи</NavLink></button>             
                </nav>
            </header>

            <main>
                <Outlet/>
            </main>
            
        </div>
    )
}
