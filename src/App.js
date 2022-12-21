import RegisterUser from './components/User/RegisterUser.jsx'
import UserList from './components/UserList/UserList';
//import Home from './components/Home';
import Navbar from './components/Layout/Navbar.jsx';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VehicleList from './components/Vehicles/VehicleList.jsx';

function App() {
  return (
    <Router>
    <header><Navbar /></header>
    <main>
      <Routes>
      <Route path='/' element={<VehicleList />}/>
      <Route path='/users' element={<UserList />}/>
      <Route path='/add-user' element={<RegisterUser/>}/>
      </Routes>
    </main>
    </Router>
  );
}

export default App;
