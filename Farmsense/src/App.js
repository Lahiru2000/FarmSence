 
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './Component/Login';
import Register from './Component/Register';
 
import Navbar from './Component/Navbar';
import PrivateRoute from './Component/PrivateRoute';

 
import ImageAnalysis from './AI_Component/ImageAnalysis';
import TxtAnalysis from './AI_Component/TxtAnalysis';
import ProductList from './Component/ProductList';
import CreateProduct from './Component/CreateProduct';
import EditProduct from './Component/EditProduct';
import UserProducts from './Component/UserProducts';
// import ProductDetail from './Component/ProductDashboard';
import DeleteProduct from './Component/DeleteProduct';
import FirstHome from './Component/FirstHome';
import Footer from './Component/Footer';
import ProductDetails from './Component/ProductDetails';
 


function App() {
  return (

    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          <div className="container mt-4">
            <Routes>
            <Route path="/" element={<FirstHome/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              
              {/* authenticated routes */}
              <Route path="/ImgAI" element={<PrivateRoute><ImageAnalysis /></PrivateRoute>} />
              <Route path="/TxtAi" element={<PrivateRoute><TxtAnalysis /></PrivateRoute>} />
              <Route path="/products" element={<PrivateRoute><ProductList /></PrivateRoute>} />
              <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
              <Route path="/product/create" element={<PrivateRoute><CreateProduct /></PrivateRoute>} />       
              <Route path="/product/edit/:id" element={<PrivateRoute><EditProduct /></PrivateRoute>} />
              <Route path="/product/delete/:id" element={<PrivateRoute><DeleteProduct /></PrivateRoute>} />
              <Route path="/user/:userId/products" element={<PrivateRoute><UserProducts /></PrivateRoute>} />
              <Route path="/productspath" element={<PrivateRoute><ProductList /></PrivateRoute>} />
           
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                   
                </PrivateRoute>
              } />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
 
 