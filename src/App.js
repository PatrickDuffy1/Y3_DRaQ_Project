import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ReadPosts from './components/readPosts';
import ReadComments from './components/readComments';
import SignIn from './components/signIn';
import CreateAccount from './components/createAccount';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <div className="App">
        {/* Displays Nav Bar */}
        <Navbar1></Navbar1>

        {/* Routes to selected page */}
        <Routes>
        
          {/* Routes to Home page */}
          <Route path='/' element={<ReadPosts></ReadPosts>}></Route>

          <Route path='/comments/:id' element={<ReadComments></ReadComments>}></Route>

          <Route path='/signin' element={<SignIn></SignIn>}></Route>

          <Route path='/createaccount' element={<CreateAccount></CreateAccount>}></Route>
        </Routes>

      </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
