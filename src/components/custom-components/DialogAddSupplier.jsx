import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const DialogAddVendor = ({ open, onClose, newData, handleInputChange, handleSubmit }) => {
    return (
        <>
            <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Agregar nuevo proveedor</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Ingresa los detalles del nuevo proveedor.
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
                        name="nombre_contacto"
                        label="Nombre de Contacto"
                        type="text"
                        fullWidth
                        value={newData.nombre_contacto}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        margin="dense"
                        name="telefono_contacto"
                        label="Teléfono de Contacto"
                        type="tel"
                        fullWidth
                        value={newData.telefono_contacto}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        margin="dense"
                        name="direccion"
                        label="Dirección"
                        type="text"
                        fullWidth
                        value={newData.direccion}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        margin="dense"
                        name="ciudad"
                        label="Ciudad"
                        type="text"
                        fullWidth
                        value={newData.ciudad}
                        onChange={handleInputChange}
                    />
                    <TextField 
                        margin="dense"
                        name="codigo_postal"
                        label="Código Postal"
                        type="text"
                        fullWidth
                        value={newData.codigo_postal}
                        onChange={handleInputChange}
                    />
                    <Select
                        fullWidth
                        name="status"
                        value={newData.status || 0}
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
    );
}

export default DialogAddVendor;
