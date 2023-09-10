import React, { Component } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const DialogAdd = ({ open, onClose, newData, handleInputChange, handleSubmit } ) =>{

    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Agregar nueva categoría</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingresa los detalles de la nueva categoría.
            </DialogContentText>
            <TextField 
              autoFocus
              margin="dense"
              name="nombre"
              label="Nombre"
              type="text"
              fullWidth
              value={newData.nombre}
              onChange={handleInputChange}
            />
            <TextField 
              margin="dense"
              name="descripcion"
              label="Descripción"
              type="text"
              fullWidth
              multiline
              maxRows={4}
              value={newData.descripcion}
              onChange={handleInputChange}
            />
            <Select
              fullWidth
              name="status"
              value={newData.status || 0} // Asegura un valor por defecto si es undefined
              onChange={handleInputChange}
              displayEmpty >
              <MenuItem value={1}>Activo</MenuItem>
              <MenuItem value={0}>Inactivo</MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </>

    )

}

export default DialogAdd;