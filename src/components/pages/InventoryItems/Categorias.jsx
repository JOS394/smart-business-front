import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import supabase from '../../supabaseClient';

function Categorias() {
  const [rows, setRows] = useState([]);


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
    };

    // Llama a la función para obtener los datos
    fetchData();
  }, []); // Ejecuta solo una vez, al montar el componente

  // Define las columnas según los campos de tu tabla
  const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'nombre', headerName: 'Nombre', width: 300 },
    { field: 'descripcion', headerName: 'Descripcion', width: 500 },
    { field: 'status', headerName: 'Estado', width: 100 },
    // ... otras columnas ...
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

export default Categorias;
