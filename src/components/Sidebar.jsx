import React, { useState } from 'react';
import {
  AppBar, Toolbar, IconButton, Drawer, List, ListItem,
  Typography, Avatar, Tooltip, Collapse, ListItemText
} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import InventoryIcon from '@mui/icons-material/Inventory';
import SalesIcon from '@mui/icons-material/PointOfSale';
import ShoppingIcon from '@mui/icons-material/ShoppingCart';
import BillsIcon from '@mui/icons-material/LocalAtm';
import BusinessIcon from '@mui/icons-material/AddBusiness';

const menuItems = [
  {
    name: 'Inventario',
    icon: <InventoryIcon />,
    items: ['Productos', 'Categorias', 'Proveedores', 'Gestion de Bodega', 'Ajustes de inventario']
  },
  //... añadir otras secciones aquí
];

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState({});

  const toggleDrawer = (isOpen) => {
    setMobileOpen(isOpen);
  };

  const handleClickMenu = (menuName) => {
    setOpenMenus(prev => ({ ...prev, [menuName]: !prev[menuName] }));
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton color="inherit" aria-label="menu" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            LOGO
          </Typography>
          <Tooltip title="User Settings">
            <Avatar alt="User" />
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer anchor={'left'} open={mobileOpen} onClose={() => toggleDrawer(false)}>
        <List>
          {menuItems.map(menu => (
            <React.Fragment key={menu.name}>
              <ListItem button onClick={() => handleClickMenu(menu.name)}>
                {menu.icon}
                <ListItemText primary={menu.name} />
                {menu.items && (openMenus[menu.name] ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>

              {menu.items && (
                <Collapse in={openMenus[menu.name]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {menu.items.map(item => (
                      <ListItem button key={item} component={Link} to={`/${item.toLowerCase().replace(/\s+/g, '')}`}>
                        <ListItemText primary={item} sx={{ marginLeft: 4 }} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default ResponsiveDrawer;
