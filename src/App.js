import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadPosts from './components/readPosts';
import ReadComments from './components/readComments';
import SignIn from './components/signIn';
import CreateAccount from './components/createAccount';
import CreatePost from './components/createPost';
import EditPost from './components/editPost';
import CreateComment from './components/createComment';
import EditComment from './components/editComment';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Displays Nav Bar */}
        <Navbar1></Navbar1>

        {/* Routes to selected page */}
        <Routes>
        
          {/* Routes to Home page */}
          <Route path='/' element={<ReadPosts></ReadPosts>}></Route>

          <Route path='/post/:id' element={<ReadComments></ReadComments>}></Route>

          <Route path='/signin' element={<SignIn></SignIn>}></Route>

          <Route path='/createaccount' element={<CreateAccount></CreateAccount>}></Route>

          <Route path='/createpost' element={<CreatePost></CreatePost>}></Route>

          <Route path='/edit/:id' element={<EditPost></EditPost>}></Route>

          <Route path='/createcomment/:id' element={<CreateComment></CreateComment>}></Route>

          <Route path='/editcomment/:id/:cid' element={<EditComment></EditComment>}></Route>

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
