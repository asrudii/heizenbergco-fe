import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import ChangePassAdmin from './pages/ChangePassAdmin';
import Home from './pages/Home';
import HomeAdmin from './pages/HomeAdmin';
import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Register from './pages/Register';
import ResetAdmin from './pages/ResetAdmin';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const dispatch = useDispatch();

  const keepLoginAdmin = async () => {
    try {
      const token = localStorage.getItem('tokenAdmin');
      if (token.length) {
        const response = await axios.post(
          'http://localhost:5000/admin/auth/get',
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );

        dispatch({ type: 'AUTH_ADMIN', payload: response.data.data });
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    keepLoginAdmin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/reset" element={<ResetAdmin />} />
        <Route
          path="/admin/change-password/:token"
          element={<ChangePassAdmin />}
        />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
