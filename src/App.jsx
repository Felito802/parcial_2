import './App.css';
import Form from './components/Form';
import UserHome from './components/UserHome';
import AdminHome from './components/AdminHome';
import RegisterForm from './components/RegisterForm';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import { useState } from 'react';


function App() {
  const [user, setUser] = useState(localStorage.getItem('user'));  // Cargar rol desde localStorage

  const handleUserLogin = (userRole) => {
    setUser(userRole);
    localStorage.setItem('user', userRole);
};
  return (  
    <BrowserRouter>
      {/* <Navigation/> */}
      <Routes>
        <Route index element={<Form callback={setUser}/>}></Route>
        <Route path='/RegisterForm' element={<RegisterForm />} />
        <Route path='/userHome' element={<UserHome user={user}/>}></Route>
        <Route path='/adminHome' element={<AdminHome user={user}/>}></Route>
        
        
      </Routes>
    </BrowserRouter>
  )
}

// function Navigation(){
//   return <nav>
//     <ul>
//       <li>
//         <Link to="/userHome">userHome</Link>
//       </li>
//       <li>
//         <Link to="/adminHome">adminHome</Link>
//       </li>
//     </ul>
//   </nav>
// }

export default App
