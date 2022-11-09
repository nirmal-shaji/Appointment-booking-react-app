import React from 'react';
import 'antd/dist/antd.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home'
import Application from './pages/Application';
import Applications from './pages/Applications';
import Notifications from './pages/Notifications';
import UserList from './pages/admin/UserList';
import NewApplications from './pages/admin/NewApplications';
import ApprovedApplications from './pages/admin/ApprovedApplications';
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux"
import ProtectedRoute from './components/protectedRoutes';
import PublicRoute from './components/publicRoute';
import Slot from './pages/admin/Slot';
function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
      {loading && <div className="spinner-parent">
        <div className="spinner-border" role="status">

        </div>
      </div>
      }

      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />

        <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />

        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/Application' element={<ProtectedRoute><Application/></ProtectedRoute>} />
        <Route path='/Applications' element={<ProtectedRoute><Applications/></ProtectedRoute>} />
        <Route path='/Notifications' element={<ProtectedRoute><Notifications/></ProtectedRoute>} />
        <Route path='/users' element={<ProtectedRoute><UserList/></ProtectedRoute>} />
        <Route path='/new-Applications' element={<ProtectedRoute><NewApplications/></ProtectedRoute>} />
        <Route path='/approved-Applications' element={<ProtectedRoute><ApprovedApplications/></ProtectedRoute>} />
        <Route path='/slot-Booking' element={<ProtectedRoute><Slot/></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
