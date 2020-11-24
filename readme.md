DELILAH RESTO => ACAMICA PROYECTO 3

=> BASE DE DATOS <=

El archivo delilah-resto.sql contiene todas las tablas ya listas con algunos datos preconfigurados para su testeo.

=> DEPENDENCIAS UTILIZADAS <=

* Express
* Body-parser
* jsonwebtoken
* mysql2
* nomedon
* sequelize

=> ENDPOINTS <=

=> Usuarios <=

* post => /usuarios
* post => /usuarios/loguin
* get => /usuarios/:user_id

=> Productos <=

* post => /productos
* get => /productos
* patch => /productos/:product_id
* delete => /productos/:product_id

=> Pedidos <=

* post => /pedidos
* get => /pedidos/:order_id
* patch => /pedidos/:order_id
* delete => /pedidos/:order_id


=> SERVIDOR <=

El archivo index.js contiene la configuracion del servidor el cual correra por el puerto 3000 y el archivo conexion.js contiene la configuracion de sequelize y la ruta a donde se alojara la base de datos que se genere con la informacion del archivo SQL

=> POSTMAN <=

En el archivo de postman se encuentran todos los endpoint con sus metodos correspondientes para poder probarlos.