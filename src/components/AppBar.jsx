import React,{useState,useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
const pages = ['Inventario', 'Ventas', 'Compras', 'Gastos', 'Citas','Reportes'];
const settings = ['Perfil', 'Cuenta', 'Dashboard', 'Cerrar Sesion'];

const InventoryItems  = ['Materia Prima', 'Ajustes de inventario', 'Traslados', 'Pre-ventas'];// const InventoryItems  = ['Raw Material', 'Inventory Adjustments', 'Transfers', 'Pre-sales'];
const SalesItems      = ['Registro de ventas', 'Promociones', 'Devoluciones', 'Pre-ventas'];// const SalesItems      = ['Sales Registry', 'Promotions', 'Returns', 'Pre-sales'];
const ShoppingsItems  = ['Registro de Compras', 'Devoluciones'];// const ShoppingsItems  = ['Purchase Registry', 'Returns'];
const BillsItems      = ['Registro de Gastos'];// const BillsItems      = ['Expense Registry'];
const MyBusinessItems = ['Productos','Categorias','Clientes','Proveedores','Canales de Ventas','Documentos','Cierre de Caja']// const MyBusinessItems = ['Products', 'Categories', 'Clients', 'Suppliers', 'Sales Channels', 'Documents', 'Cash Register Closure'];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [anchorElInventory, setAnchorElInventory] = useState(null);
  const [anchorElSales, setAnchorElSales] = useState(null);
  const [anchorElShoppings, setAnchorElShoppings] = useState(null);
  const [anchorElBills, setAnchorElBills] = useState(null);
  const [anchorElBusiness, setAnchorElBusiness] = useState(null);

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
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
                  {InventoryItems.map((item) => <MenuItem key={item} onClick={handleCloseInventoryMenu}>{item}</MenuItem>)}
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
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
  );
  
}
export default ResponsiveAppBar;
