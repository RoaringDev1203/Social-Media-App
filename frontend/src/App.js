import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Alert from './components/layout/Alert';
import Home from './components/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import CreatePost from './components/posts/CreatePost';
import Notifications from './components/notifications/Notifications';
import Posts from './components/posts/Posts';
import EditPost from './components/posts/EditPost';
import Profile from './pages/Profile';

const App = () => {
    return (
        <Router>
            <Navbar />
            <section className="container">
                <Alert />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route path='/create-post' element={<CreatePost />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/posts' element={<Posts />} />
                    <Route path='/edit-post/:id' element={<EditPost />} />
                    <Route path='/profile' element={<Profile />} />
                </Routes>
            </section>
        </Router>
    );
};

export default App;
