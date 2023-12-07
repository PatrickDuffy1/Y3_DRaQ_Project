import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar1 from './components/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ReadPosts from './components/readPosts';
import ReadComments from './components/readComments';

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

          <Route path='/comments/:id' element={<ReadComments></ReadComments>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
