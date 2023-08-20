import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/AppBar'
import Home from './components/Home'
import Productos from './components/pages/InventoryItems/Productos';
import Proveedores from './components/pages/InventoryItems/Proveedores';
import Categorias from './components/pages/InventoryItems/Categorias';
import GestionBodega from './components/pages/InventoryItems/GestionBodega';
import AjustesInventario from './components/pages/InventoryItems/AjustesInventario';


function App() {


  return (
    <>
      <NavBar />
      <Routes>
      <Route
          path="/"
          element={<Home />} 
        />
        <Route
          path="/productos"
          element={<Productos />}
        />
        <Route
          path="/proveedores"
          element={<Proveedores />}
        />
        <Route
          path="/categorias"
          element={<Categorias />}
        />
        <Route
          path="/gestiondebodega"
          element={<GestionBodega />}
        />
        <Route
          path="/ajustesdeinventario"
          element={<AjustesInventario />}
        />
      </Routes>
    </>
  )
}

export default App
