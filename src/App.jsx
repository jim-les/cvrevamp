import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./App.css";
// pages imports 
import Home from './pages/Home';

// user dahsboard pages
import Dashboard from './pages/Dashboard/Dashboard';
import Resume from './pages/Dashboard/Resume';
import Sbscription from './pages/Dashboard/Sbscription';
import Templates from './pages/Dashboard/Templates';

// import admin pages
import AdminDashboard from './pages/Admin/Dashboard';
import User from './pages/Admin/User';
import AdminTemplates from './pages/Admin/Templates';
import Orders from './pages/Admin/Orders';
import Subscription from './pages/Admin/Subscription';

// import Auth pages
import Login from './Auth/Login';
import SignupForm from './Auth/SignupForm';


const App = () => {
    return (
        <Router>
            <Routes>
                {/* auth links */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignupForm />} />

                {/* user links */}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/dashboard/resume" element={<Resume />} />
                <Route path="/dashboard/subscription" element={<Sbscription />} />
                <Route path="/dashboard/templates" element={<Templates />} />

                {/* admin urls links */}
                <Route path='/admin' element={<AdminDashboard />} />
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
                <Route path='/admin/dashboard/users' element={<User />} />
                <Route path='/admin/dashboard/templates' element={<AdminTemplates />} />
                <Route path='/admin/dashboard/orders' element={<Orders />} />
                <Route path='/admin/dashboard/subscription' element={<Subscription />} />
            </Routes>
        </Router>
    )
}

export default App