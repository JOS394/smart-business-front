import React, { Component } from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const DialogAdd = ({ open, onClose, newCategory, handleInputChange, handleSubmit } ) =>{

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
              value={newCategory.nombre}
              onChange={handleInputChange}
            />
            <TextField 
              margin="dense"
              name="descripcion"
              label="Descripción"
              type="text"
              fullWidth
              value={newCategory.descripcion}
              onChange={handleInputChange}
            />
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