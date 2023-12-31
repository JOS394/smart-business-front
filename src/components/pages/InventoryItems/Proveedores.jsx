import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import SearchInput from "../../custom-components/Search";
import Chip from '@mui/material/Chip';
import AddIcon from '@mui/icons-material/Add';
import DialogAddSupplier from '../../custom-components/DialogAddSupplier';
import ButtonAddSupplier from '../../custom-components/ButtonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';


import supabase from '../../supabaseClient';

function Proveedores() {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [open, setOpen] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    nombre: '',
    nombre_contacto: '',
    telefono_contacto: '',
    direccion: '',
    ciudad: '',
    codigo_postal: '',
    status: 0,
  });

  const fetchData = async () => {
    
    const {  data, error } = await supabase.from('suppliers').select('*');
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
        row.nombre_contacto.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredRows(newFilteredRows);
    }
  }, [searchTerm, rows]);

  useEffect(() => {
    if (selectedSupplier) {
      setNewSupplier(selectedSupplier);
    } else {
      setNewSupplier({ nombre: '',nombre_contacto: '',telefono_contacto: '',direccion: '',ciudad: '',codigo_postal: '',status: 0 });
    }
  }, [selectedSupplier]);

  const handleOpen = () => {
    setSelectedSupplier(null);
    setNewSupplier({
    nombre: '',
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
    setNewSupplier(prev => ({ ...prev, [name]: parseInt(value) || value })); // Parsea a entero si es necesario
  };

  const handleSubmit = async () => {
    
    let data, error;
  
    if (selectedSupplier) {
      // Actualización
      ({ data, error } = await supabase
        .from('suppliers')
        .update({
          nombre:newSupplier.nombre,
          nombre_contacto:newSupplier.nombre_contacto,
          telefono_contacto:newSupplier.telefono_contacto,
          direccion:newSupplier.direccion,
          ciudad:newSupplier.ciudad,
          codigo_postal:newSupplier.codigo_postal,
          status:newSupplier.status,

        })
        .match({ id: selectedSupplier.id }));
    } else {
      // Inserción
      ({ data, error } = await supabase
        .from('suppliers')
        .insert([
          { 
            nombre:newSupplier.nombre,
            nombre_contacto:newSupplier.nombre_contacto,
            telefono_contacto:newSupplier.telefono_contacto,
            direccion:newSupplier.direccion,
            ciudad:newSupplier.ciudad,
            codigo_postal:newSupplier.codigo_postal,
            status:newSupplier.status,
          }
        ])
        .select());
    }
  
    if (error) {
      console.error("Error:", error);
      return;
    }
  
    if (selectedSupplier) {
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
      setSelectedSupplier(null);  // Resetea la categoría seleccionada
    } else {
      setRows(prevRows => [...prevRows, ...data]);
    }
    fetchData();
    handleClose();
  };
  


  const handleDelete = async (supplierId) => {
    const { data, error } = await supabase
        .from('suppliers')
        .delete()
        .match({ id: supplierId }); // Asume que cada categoría tiene un ID único

    if (error) {
        console.error("Error eliminando proveedor:", error);
        return;
    }
    // Si todo va bien, actualiza el estado local eliminando la categoría
    setRows(prevRows => prevRows.filter(row => row.id !== supplierId));
};

  const handleSearchChange = (event)=> {
    setSearchTerm(event.target.value);
}

const handleEditOpen = (supplier) => {
  setSelectedSupplier(supplier);
  setNewSupplier({  
    nombre:supplier.nombre,
    nombre_contacto:supplier.nombre_contacto,
    telefono_contacto:supplier.telefono_contacto,
    direccion:supplier.direccion,
    ciudad:supplier.ciudad,
    codigo_postal:supplier.codigo_postal,
    status:supplier.status || 0 ,
    // Por si acaso no hay un valor definido, toma 0 como predeterminado
  });
  setOpen(true);
};

const columns = [
  { field: 'nombre', headerName: 'Nombre', width: 250 },
  { field: 'nombre_contacto', headerName: 'Nombre Contacto', width: 200 },
  { field: 'telefono_contacto', headerName: 'Telefono Contacto', width: 150 },
  { field: 'direccion', headerName: 'Direccion', width: 200 },
  { field: 'ciudad', headerName: 'Ciudad', width: 100 },
  { field: 'codigo_postal', headerName: 'Codigo Postal', width: 150 },
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
    <DialogAddSupplier 
      open={open}
      onClose={handleClose}
      newData={newSupplier}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />

<div style={{ display: 'flex', width: '97%' }}>
    <div style={{ marginTop:'25px'}}>
         <ButtonAddSupplier  
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

export default Proveedores;
