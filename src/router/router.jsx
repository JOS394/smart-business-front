// Routes.js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RegistroDeVentas from './RegistroDeVentas';
import Promociones from './Promociones';
// Importa otros componentes

const Routes = () => (
  <Switch>
    <Route path="/path/to/Registro de ventas" component={RegistroDeVentas} />
    <Route path="/path/to/Promociones" component={Promociones} />
    {/* Otras rutas */}
  </Switch>
);

export default Routes;
