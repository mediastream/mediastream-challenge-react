import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Exercise01 from './components/pages/Exercise01';
import Exercise02 from './components/pages/Exercise02';
import Home from './components/pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} exact />
        <Route path="/01" element={<Exercise01/>}  />
        <Route path="/02" element={<Exercise02/>}  />
      </Routes>
    </Router>
  );
}

export default App;
