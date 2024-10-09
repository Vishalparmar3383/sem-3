import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetail from './itemdetail';
import Items from './items';
import Formproduct from './formproduct';
import About from './about';
import Contact from './contact';
import ItemAdd from './itemadd';
import Orders from './orders';
import Admin from './admin';
import Editproducts from './editproducts';
import EditDelete from './editdelete';
import EditInfo from './editinfo';
import { CheckLoginProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <CheckLoginProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Items />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/admin/items"
            element={
              <ProtectedRoute>
                <Editproducts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/items/form"
            element={
              <ProtectedRoute>
                <ItemAdd />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/items/:id"
            element={
              <ProtectedRoute>
                <EditDelete />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/items/:id/edit"
            element={
              <ProtectedRoute>
                <EditInfo />
              </ProtectedRoute>
            }
          />
          <Route path="/items/:id/form" element={<Formproduct />} />
          <Route path="/items/:id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </CheckLoginProvider>
  </BrowserRouter>
);
