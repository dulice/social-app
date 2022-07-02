import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserProtect from './protectedRoute/UserProtect';
import Header from './components/header';
import { Home, Setting, Profile, Explore, UploadPost, Suggest, Chat, Signup, Login} from './pages'
import SearchResult from './pages/SearchResult';

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
      <Route path="/explore/people" element={ <UserProtect> <Suggest /> </UserProtect>}  />
      <Route path="/chat" element={ <UserProtect> <Chat /> </UserProtect>}  />
      <Route path="/search" element={ <SearchResult /> }  />
        <Route path="/register" element={ <Signup />}  />
        <Route path="/login" element={ <Login />}  />
      </Routes>
    </div>
  );
}

export default App;
