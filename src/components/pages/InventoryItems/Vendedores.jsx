import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchInput from "../../custom-components/Search";
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import DialogAddVendors from '../../custom-components/DialogAddSupplier';
import ButtonAddVendors from '../../custom-components/ButtonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


import supabase from '../../supabaseClient';

function Vendedores() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [open, setOpen] = useState(false);
  const [newVendor, setNewVendor] = useState({
    nombre: '',
    nombre_vendedor: '',
    email_vendedor: '',
    telefono_vendedor: '',
    nombre_contacto: '',
    telefono_contacto: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    status: 0,
  });

  const fetchData = async () => {
    
    const {  data, error } = await supabase.from('vendors').select('*');
    if (error) {
      console.error('Error cargando datos:', error);
      return;
    }
    setRows(data);
    setFilteredRows(data);
  };

  useEffect(() => {
    fetchData();
  }, []); // Ejecuta solo una vez, al montar el componente

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRows(rows); // Si no hay término de búsqueda, muestra todas las filas
    } else {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const newFilteredRows = rows.filter(row =>
        row.nombre.toLowerCase().includes(lowercasedSearchTerm) ||
        row.nombre_vendedor.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredRows(newFilteredRows);
    }
  }, [searchTerm, rows]);

  useEffect(() => {
    if (selectedVendor) {
      setNewVendor(selectedVendor);
    } else {
      setNewVendor({ nombre: '',nombre_vendedor: '',email_vendedor: '',telefono_vendedor: '',nombre_contacto: '',telefono_contacto: '',direccion: '',ciudad: '',codigo_postal: '',status: 0 });
    }
  }, [selectedVendor]);

  const handleOpen = () => {
    setSelectedVendor(null);
    setNewVendor({
    nombre: '',
    nombre_vendedor: '',
    email_vendedor: '',
    telefono_vendedor: '',
    nombre_contacto: '',
    telefono_contacto: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    status: 0 // Valor por defecto cuando agregas una nueva categoría
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewVendor(prev => ({ ...prev, [name]: parseInt(value) || value })); // Parsea a entero si es necesario
  };

  const handleSubmit = async () => {
    
    let data, error;
  
    if (selectedVendor) {
      // Actualización
      ({ data, error } = await supabase
        .from('vendors')
        .update({
          nombre:newVendor.nombre,
          nombre_vendedor:newVendor.nombre_vendedor,
          email_vendedor:newVendor.email_vendedor,
          telefono_vendedor:newVendor.telefono_vendedor,
          nombre_contacto:newVendor.nombre_contacto,
          telefono_contacto:newVendor.telefono_contacto,
          direccion:newVendor.direccion,
          ciudad:newVendor.ciudad,
          codigo_postal:newVendor.codigo_postal,
          status:newVendor.status,

        })
        .match({ id: selectedVendor.id }));
    } else {
      // Inserción
      ({ data, error } = await supabase
        .from('vendors')
        .insert([
          { 
            nombre:newVendor.nombre,
            nombre_vendedor:newVendor.nombre_vendedor,
            email_vendedor:newVendor.email_vendedor,
            telefono_vendedor:newVendor.telefono_vendedor,
            nombre_contacto:newVendor.nombre_contacto,
            telefono_contacto:newVendor.telefono_contacto,
            direccion:newVendor.direccion,
            ciudad:newVendor.ciudad,
            codigo_postal:newVendor.codigo_postal,
            status:newVendor.status,
          }
        ])
        .select());
    }
  
    if (error) {
      console.error("Error:", error);
      return;
    }
  
    if (selectedVendor) {
      // Actualiza la lista de categorías en el estado
      if (data && data.length > 0) {
        setRows(prevRows => {
          if (!prevRows) {
            return [data[0]];
          }
          return prevRows.map(row => row.id === data[0].id ? data[0] : row);
        });
      }
      
      // setRows(prevRows => prevRows.map(row => row.id === data[0].id ? data[0] : row));
      setSelectedVendor(null);  // Resetea la categoría seleccionada
    } else {
      setRows(prevRows => [...prevRows, ...data]);
    }
    fetchData();
    handleClose();
  };
  


  const handleDelete = async (vendorId) => {
    const { data, error } = await supabase
        .from('vendors')
        .delete()
        .match({ id: vendorId }); // Asume que cada categoría tiene un ID único

    if (error) {
        console.error("Error eliminando proveedor:", error);
        return;
    }
    // Si todo va bien, actualiza el estado local eliminando la categoría
    setRows(prevRows => prevRows.filter(row => row.id !== vendorId));
};

  const handleSearchChange = (event)=> {
    setSearchTerm(event.target.value);
}

const handleEditOpen = (vendor) => {
  setSelectedVendor(vendor);
  setNewVendor({  
    nombre:vendor.nombre,
    nombre_vendedor:vendor.nombre_vendedor,
    email_vendedor:vendor.email_vendedor,
    telefono_vendedor:vendor.telefono_vendedor,
    nombre_contacto:vendor.nombre_contacto,
    telefono_contacto:vendor.telefono_contacto,
    direccion:vendor.direccion,
    ciudad:vendor.ciudad,
    codigo_postal:vendor.codigo_postal,
    status:vendor.status || 0 ,
    // Por si acaso no hay un valor definido, toma 0 como predeterminado
  });
  setOpen(true);
};

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 100 },
  { field: 'nombre_vendedor', headerName: 'Vendedor', width: 100 },
  { field: 'email_vendedor', headerName: 'Email Vendedor', width: 100 },
  { field: 'telefono_vendedor', headerName: 'Telefono vendedor', width: 100 },
  { field: 'nombre_contacto', headerName: 'Nombre Contacto', width: 100 },
  { field: 'telefono_contacto', headerName: 'Telefono Contacto', width: 100 },
  { field: 'direccion', headerName: 'Direccion', width: 100 },
  { field: 'ciudad', headerName: 'Ciudad', width: 100 },
  { field: 'codigo_postal', headerName: 'Codigo Postal', width: 100 },
  { 
    field: 'status', 
    headerName: 'Estado', 
    width: 100,
    renderCell: (params) => {
      if (params.value === 1) {
        return <Chip label="Activo" color="primary" style={{backgroundColor: 'green'}} />;
      } else {
        return <Chip label="Inactivo" color="secondary" style={{backgroundColor: 'red'}} />;
      }
    }
  },
  {
      field: 'actions',
      headerName: 'Acciones',
      width: 100,
      renderCell: (params) => (
          <>
              <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
                  <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleEditOpen(params.row)} color="primary">
                  <EditIcon />
              </IconButton>
          </>
      ),
  },
];


  return (
    <>
    <div style={{width: '97%', marginTop:"10px" }}>
    <DialogAddVendors 
      open={open}
      onClose={handleClose}
      newData={newVendor}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />

<div style={{ display: 'flex', width: '97%' }}>
    <div style={{ marginTop:'25px'}}>
         <ButtonAddVendors  
          variant="contained" 
          color="primary" 
          onClick={handleOpen}
          labelButton="Proveedor"
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

export default Vendedores;
