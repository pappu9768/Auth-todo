import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Home from './components/Home';
import Create from './components/Create';
import Update from './components/Update';
import RefreshHandler from './RefreshHandler';
const App = () => {

  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  const PrivateRoute = ({ children }) => {
    //if isAuthenticated then it will redirect children (in children all the routes will cover ) if not it will redirect to login page
    return isAuthenticated ? children : <Navigate to = "/login"/>
  }
  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
      <Routes>
        <Route path='/' element={<Navigate to="/login"/>}/>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />
        <Route path='/create' element={
          <PrivateRoute>
            <Create />
          </PrivateRoute>
        } />
        <Route path='/update/:id' element={
          <PrivateRoute>
            <Update />
          </PrivateRoute>
        } />
      </Routes>

      <ToastContainer position='bottom-right' />
    </>
  )
}

export default App
