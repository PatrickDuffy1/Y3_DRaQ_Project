import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Content from './components/content';
import Navbar1 from './components/navbar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Read from './components/read';
import Create from './components/create';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Displays Nav Bar */}
        <Navbar1></Navbar1>

        {/* Routes to selected page */}
        <Routes>
          {/* Routes to Home page */}
          <Route path='/' element={<Content></Content>}></Route>

          {/* Routes to Read page */}
          <Route path='/read' element={<Read></Read>}></Route>

          {/* Routes to Create page */}
          <Route path='/create' element={<Create></Create>}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
