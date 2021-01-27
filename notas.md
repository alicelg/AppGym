## RUTAS

GET /clientes -> muestra una vista con todos los clientes
GET /clientes/idcliente -> muestra un unico cliente

GET /clientes/nuevo -> Muestra una vista con el formulario para insertar un cliente
POST/clientes/create -> Recibe los datos del formulario anterior y redirige a /clientes
GET /clientes/edita/idCliente -> Muestra una vista con el formulario para editar un cliente
POST /clientes/update -> Recibe los datos del formulario anterior y redirige a /clientes
GET /clientes/borrar/idCliente -> Borra los datos del cliente especificado
