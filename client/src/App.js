import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserProtect from './protectedRoute/UserProtect';
import Header from './components/header';
import { Home, Setting, Profile, Explore, UploadPost, Suggest, Chat, Signup, Login} from './pages'
import SearchResult from './pages/SearchResult';
import { useSelector } from 'react-redux';
import Error from './pages/Error';
import Activity from './pages/Activity';

function App() {
  const user = useSelector(state => state.user.user);

  return (
    <div className="App">
      {user && <Header />}
      <Routes>
        <Route path="/" element={ <UserProtect> <Home /> </UserProtect>}  />
        <Route path="/accounts/edit" element={ <UserProtect> <Setting /> </UserProtect>}  />
        <Route path="/profile/:username" element={ <UserProtect> <Profile /> </UserProtect>}  />
        <Route path="/explore" element={ <UserProtect> <Explore /> </UserProtect>}  />
        <Route path="/uploadpost" element={ <UserProtect> <UploadPost /> </UserProtect>}  />
        <Route path="/explore/people" element={ <UserProtect> <Suggest /> </UserProtect>}  />
        <Route path="/chat" element={ <UserProtect> <Chat /> </UserProtect>}  />
        <Route path="/activity" element={ <UserProtect> <Activity /> </UserProtect>}  />
        <Route path="/search" element={ <SearchResult /> }  />
        <Route path="/register" element={ <Signup />}  />
        <Route path="/login" element={ <Login />}  />
        <Route path="*" element={ <Error />}  />
      </Routes>
    </div>
  );
}

export default App;
