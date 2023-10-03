import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';
import Missions from './components/Missions';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route index element={<Rockets />} />
            <Route path="/missions" element={<Missions />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
