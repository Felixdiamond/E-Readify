import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import SignUp from './pages/SignUp/SignUp'

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      {/* <Route path="/discover" component={Discover} />
      <Route path="/release" component={Release} />
      <Route path="/forum" component={Forum} />
      <Route path="/about" component={About} /> */}
    </Routes>
  </Router>
);

export default App
