import './App.css';
import Navbar from './components/navbar';
import Banner from './components/banner';
import Trending from './components/trending';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={
          <>
            <Banner />
            <Trending />
          </>
        } />
        <Route path="movies" element={
          <>
            <Trending />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
