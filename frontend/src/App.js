import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import HomeUpload from './components/Home-Upload';
import HomeCapture from './components/Home-Capture';
import Dashboard from './components/Dashboard';
import ReportDetail from './components/ReportDetail';
import RegisterSuccess from './components/RegisterSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload-pic" element={<HomeUpload />} />
        <Route path="/capture-img" element={<HomeCapture />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report-detail" element={<ReportDetail />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;
