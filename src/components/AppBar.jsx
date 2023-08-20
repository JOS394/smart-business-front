import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
const pages = ['Inventario', 'Ventas', 'Compras', 'Gastos', 'Citas', 'Reportes'];
const settings = ['Perfil', 'Cuenta', 'Dashboard', 'Cerrar Sesion'];
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
// Iconos
import InventoryIcon from '@mui/icons-material/Inventory';
import SalesIcon from '@mui/icons-material/PointOfSale';
import ShoppingIcon from '@mui/icons-material/ShoppingCart';
import BillsIcon from '@mui/icons-material/LocalAtm';
import ReportsIcon from '@mui/icons-material/Assessment';
import BusinessIcon from '@mui/icons-material/AddBusiness';
import ProductsIcon from '@mui/icons-material/LocalOfferOutlined';
import CategoriesIcon from '@mui/icons-material/CategoryOutlined';
import ProvidersIcon from '@mui/icons-material/LocalShippingOutlined';
import WarehouseOutlinedIcon from '@mui/icons-material/WarehouseOutlined';
import AdjustmentsIcon from '@mui/icons-material/BuildOutlined';


// const InventoryItems = ['Ajustes de inventario', ' Gestion de Bodega']; // const InventoryItems  = ['Inventory Adjustments', 'Transfers', 'Pre-sales', 'Warehouse Locations'];
const InventoryItems = ['Productos', 'Categorias', 'Proveedores', 'Gestion de Bodega', 'Ajustes de inventario']
const SalesItems = ['Registro de ventas', 'Promociones', 'Devoluciones'];// const SalesItems      = ['Sales Registry', 'Promotions', 'Returns', 'Pre-sales'];
const ShoppingsItems = ['Registro de Compras', 'Devoluciones'];// const ShoppingsItems  = ['Purchase Registry', 'Returns'];
const BillsItems = ['Gestion de Gastos', 'Reportes de gastos'];// const BillsItems      = ['Expense Registry'];
const MyBusinessItems = ['Productos', 'Categorias', 'Clientes', 'Proveedores', 'Documentos', 'Cierre de Caja']// const MyBusinessItems = ['Products', 'Categories', 'Clients', 'Suppliers', 'Sales Channels', 'Documents', 'Cash Register Closure'];

const InventoryIcons = {
  'Productos': <ProductsIcon />,
  'Categorias': <CategoriesIcon />,
  'Proveedores': <ProvidersIcon />,
  'Gestion de Bodega': <WarehouseOutlinedIcon />,
  'Ajustes de inventario': <AdjustmentsIcon />
};


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [anchorElInventory, setAnchorElInventory] = useState(null);
  const [anchorElSales, setAnchorElSales] = useState(null);
  const [anchorElShoppings, setAnchorElShoppings] = useState(null);
  const [anchorElBills, setAnchorElBills] = useState(null);
  const [anchorElBusiness, setAnchorElBusiness] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);

  const [openMenus, setOpenMenus] = useState({
    Inventario: false,
    Ventas: false,
    Compras: false,
    Gastos: false,
    MiNegocio: false,
  });

  const handleClickMenu = (menu) => {
    setOpenMenus({ ...openMenus, [menu]: !openMenus[menu] });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  const handleOpenInventoryMenu = (event) => {
    setAnchorElInventory(event.currentTarget);
  };

  const handleCloseInventoryMenu = () => {
    setAnchorElInventory(null);
  };


  const handleOpenSalesMenu = (event) => {
    setAnchorElSales(event.currentTarget);
  };

  const handleCloseSalesMenu = () => {
    setAnchorElSales(null);
  };

  const handleOpenShoppingsMenu = (event) => {
    setAnchorElShoppings(event.currentTarget);
  };

  const handleCloseShoppingsMenu = () => {
    setAnchorElShoppings(null);
  };

  const handleOpenBillsMenu = (event) => {
    setAnchorElBills(event.currentTarget);
  };

  const handleCloseBillsMenu = () => {
    setAnchorElBills(null);
  };

  const handleOpenBusinessMenu = (event) => {
    setAnchorElBusiness(event.currentTarget);
  };

  const handleCloseBusinessMenu = () => {
    setAnchorElBusiness(null);
  };


  const handleOpenNavMenuMobile = () => {
    setMobileOpen(true);
  };

  const handleCloseNavMenuMobile = () => {
    setMobileOpen(false);
  };


  return (
    <>

      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleOpenNavMenuMobile}
              sx={{ display: { xs: 'flex', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                page === 'Inventario' ? (
                  <React.Fragment key={page}>
                    <Button onClick={handleOpenInventoryMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                    <Menu anchorEl={anchorElInventory} keepMounted open={Boolean(anchorElInventory)} onClose={handleCloseInventoryMenu}>
                      {InventoryItems.map((item) =>
                        <MenuItem key={item} onClick={handleCloseInventoryMenu} component={Link} to={`/${item.toLowerCase().replace(/\s+/g, '')}`}>
                          <Button color="inherit">
                            {item}
                          </Button>
                        </MenuItem>)}
                    </Menu>
                  </React.Fragment>
                ) : page === 'Ventas' ? (
                  <React.Fragment key={page}>
                    <Button onClick={handleOpenSalesMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                    <Menu anchorEl={anchorElSales} keepMounted open={Boolean(anchorElSales)} onClose={handleCloseSalesMenu}>
                      {SalesItems.map((item) => <MenuItem key={item} onClick={handleCloseSalesMenu}>{item}</MenuItem>)}
                    </Menu>
                  </React.Fragment>
                ) : page === 'Compras' ? (
                  <React.Fragment key={page}>
                    <Button onClick={handleOpenShoppingsMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                    <Menu anchorEl={anchorElShoppings} keepMounted open={Boolean(anchorElShoppings)} onClose={handleCloseShoppingsMenu}>
                      {ShoppingsItems.map((item) => <MenuItem key={item} onClick={handleCloseShoppingsMenu}>{item}</MenuItem>)}
                    </Menu>
                  </React.Fragment>
                ) : page === 'Gastos' ? (
                  <React.Fragment key={page}>
                    <Button onClick={handleOpenBillsMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                    <Menu anchorEl={anchorElBills} keepMounted open={Boolean(anchorElBills)} onClose={handleCloseBillsMenu}>
                      {BillsItems.map((item) => <MenuItem key={item} onClick={handleCloseBillsMenu}>{item}</MenuItem>)}
                    </Menu>
                  </React.Fragment>
                ) : page === 'MiNegocio' ? (
                  <React.Fragment key={page}>
                    <Button onClick={handleOpenMyBusinessMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                    <Menu anchorEl={anchorElMyBusiness} keepMounted open={Boolean(anchorElMyBusiness)} onClose={handleCloseMyBusinessMenu}>
                      {MyBusinessItems.map((item) => <MenuItem key={item} onClick={handleCloseMyBusinessMenu}>{item}</MenuItem>)}
                    </Menu>
                  </React.Fragment>
                ) : (
                  <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>{page}</Button>
                )
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor={'left'} open={mobileOpen} onClose={handleCloseNavMenuMobile}>
  <List>
    {pages.map((page) => (
      <React.Fragment key={page}>
        <ListItem onClick={() => handleClickMenu(page)}>
          {page === 'Inventario' && <InventoryIcon />}
          {page === 'Ventas' && <SalesIcon />}
          {page === 'Compras' && <ShoppingIcon />}
          {page === 'Gastos' && <BillsIcon />}
          {page === 'MiNegocio' && <BusinessIcon />}
          <ListItemText primary={page} />
          {openMenus[page] ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={openMenus[page]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {page === 'Inventario' && InventoryItems.map((item) => renderSubMenuItem(item))}
            {page === 'Ventas' && SalesItems.map((item) => renderSubMenuItem(item))}
            {page === 'Compras' && ShoppingsItems.map((item) => renderSubMenuItem(item))}
            {page === 'Gastos' && BillsItems.map((item) => renderSubMenuItem(item))}
            {page === 'MiNegocio' && MyBusinessItems.map((item) => renderSubMenuItem(item))}
          </List>
        </Collapse>
      </React.Fragment>
    ))}
  </List>
</Drawer>


    </>
  );

  function renderSubMenuItem(item) {
    return (
      <ListItem key={item} button onClick={handleCloseNavMenuMobile} component={Link} to={`/${item.toLowerCase().replace(/\s+/g, '')}`}>
         {InventoryIcons[item]}
        <ListItemText primary={item} />
      </ListItem>
    );
  }
}


export default ResponsiveAppBar;
