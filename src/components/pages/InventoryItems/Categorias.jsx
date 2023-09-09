import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchInput from "../../custom-components/Search";
import AddIcon from '@mui/icons-material/Add';
import DialogAddCategories from '../../custom-components/DialogAdd';
import ButtonAddCategories from '../../custom-components/ButtonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';



import supabase from '../../supabaseClient';

function Categorias() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [open, setOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    nombre: '',
    descripcion: ''
  });



  useEffect(() => {
    // Define una función asíncrona para obtener los datos
    const fetchData = async () => {
      const {  data, error } = await supabase
        .from('categorias')
        .select('*');
      if (error) {
        console.error('Error cargando datos:', error);
        return;
      }
      setRows(data);
      setFilteredRows(data);
    };
    // Llama a la función para obtener los datos
    fetchData();
  }, []); // Ejecuta solo una vez, al montar el componente

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRows(rows); // Si no hay término de búsqueda, muestra todas las filas
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const newFilteredRows = rows.filter(row =>
        row.nombre.toLowerCase().includes(lowercasedSearchTerm) ||
        row.descripcion.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredRows(newFilteredRows);
    }
  }, [searchTerm, rows]);

  useEffect(() => {
    if (selectedCategory) {
      setNewCategory(selectedCategory);
    } else {
      setNewCategory({ nombre: '', descripcion: '' });
    }
  }, [selectedCategory]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    let data, error;
  
    if (selectedCategory) {
      // Actualización
      ({ data, error } = await supabase
        .from('categorias')
        .update({
          nombre: newCategory.nombre,
          descripcion: newCategory.descripcion
        })
        .match({ id: selectedCategory.id }));
    } else {
      // Inserción
      ({ data, error } = await supabase
        .from('categorias')
        .insert([
          { 
            nombre: newCategory.nombre,
            descripcion: newCategory.descripcion
          }
        ])
        .select());
    }
  
    if (error) {
      console.error("Error:", error);
      return;
    }
  
    if (selectedCategory) {
      // Actualiza la lista de categorías en el estado
      setRows(prevRows => prevRows.map(row => row.id === data[0].id ? data[0] : row));
      setSelectedCategory(null);  // Resetea la categoría seleccionada
    } else {
      setRows(prevRows => [...prevRows, ...data]);
    }
  
    handleClose();
  };
  


  const handleDelete = async (categoryId) => {
    const { data, error } = await supabase
        .from('categorias')
        .delete()
        .match({ id: categoryId }); // Asume que cada categoría tiene un ID único

    if (error) {
        console.error("Error eliminando categoría:", error);
        return;
    }
    // Si todo va bien, actualiza el estado local eliminando la categoría
    setRows(prevRows => prevRows.filter(row => row.id !== categoryId));
};

  const handleSearchChange = (event)=> {
    setSearchTerm(event.target.value);
}

const handleEditOpen = (category) => {
  setSelectedCategory(category);
  setOpen(true);
};

  // Define las columnas según los campos de tu tabla
  const columns = [
    // { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nombre', headerName: 'Nombre', width: 300 },
    { field: 'descripcion', headerName: 'Descripcion', width: 700 },
    { field: 'status', headerName: 'Estado', width: 100 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
          <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
              <DeleteIcon />
          </IconButton>
      ),    
  },
  {
    field: 'editAction',
    headerName: 'Editar',
    width: 150,
    renderCell: (params) => (
      <IconButton onClick={() => handleEditOpen(params.row)} color="primary">
        <EditIcon />
      </IconButton>
    ),
  },
  ];

  return (
    <>
    <div style={{width: '97%', marginTop:"10px" }}>
    <DialogAddCategories 
      open={open}
      onClose={handleClose}
      newCategory={newCategory}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />

<div style={{ display: 'flex', width: '97%' }}>
    <div style={{ marginTop:'25px'}}>
         <ButtonAddCategories 
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          labelButton="Categoría"
          style={{ width: 'auto' }}
         />
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end', width: '98%' }}>
      <SearchInput 
        variant="standard"
        label="Buscar" 
        value={searchTerm} 
        onChange={handleSearchChange}
        icon
      />
    </div>

    </div>
    <div style={{ height: 400, width: '97%' }}>
      
      <DataGrid 
        rows={filteredRows} 
        columns={columns} 
      />

    </div>

    </div>
    </>
  );
}

export default Categorias;
