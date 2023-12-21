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

                    {/* Routes to readPosts page */}
                    <Route path='/' element={<ReadPosts></ReadPosts>}></Route>

                    {/* Routes to readComments page */}
                    <Route path='/post/:id' element={<ReadComments></ReadComments>}></Route>

                    {/* Routes to signIn page */}
                    <Route path='/signin' element={<SignIn></SignIn>}></Route>

                    {/* Routes to createAccount page */}
                    <Route path='/createaccount' element={<CreateAccount></CreateAccount>}></Route>

                    {/* Routes to createpost page */}
                    <Route path='/createpost' element={<CreatePost></CreatePost>}></Route>

                    {/* Routes to editPost page */}
                    <Route path='/edit/:id' element={<EditPost></EditPost>}></Route>

                    {/* Routes to createComment page */}
                    <Route path='/createcomment/:id' element={<CreateComment></CreateComment>}></Route>

                    {/* Routes to editComment page */}
                    <Route path='/api/editcomment/:id/:cid' element={<EditComment></EditComment>}></Route>

                </Routes>

            </div>
        </BrowserRouter>
    );
}

export default App;
