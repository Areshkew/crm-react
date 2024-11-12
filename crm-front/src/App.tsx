import Navbar from './components/Navbar';
import './App.css';
import { Outlet } from '@tanstack/react-router'

const App = () => (
  <div className="app">
    <Navbar />
    <Outlet />
  </div>
);


export default App;