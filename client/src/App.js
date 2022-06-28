import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Signup from './pages/Signup';
import Login from './pages/Login';
import UserProtect from './protectedRoute/UserProtect';
import Home from './pages/Home';
import Setting from './pages/Setting';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import UploadPost from './pages/UploadPost';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={ <UserProtect> <Home /> </UserProtect>}  />
      <Route path="/accounts/edit" element={ <UserProtect> <Setting /> </UserProtect>}  />
      <Route path="/profile/:username" element={ <UserProtect> <Profile /> </UserProtect>}  />
      <Route path="/explore" element={ <UserProtect> <Explore /> </UserProtect>}  />
      <Route path="/uploadpost" element={ <UserProtect> <UploadPost /> </UserProtect>}  />
        <Route path="/register" element={ <Signup />}  />
        <Route path="/login" element={ <Login />}  />
      </Routes>
    </div>
  );
}

export default App;
