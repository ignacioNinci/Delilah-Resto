const express = require('express');
const sequelize = require('./conexion.js');
const app = express();
const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const {validateAdminJWT, validacionjwt, validateOrderData, validationJwtUser, validateProduct} = require ('./middlewares');
const tokenKey = 'asdfghjkl';
// let infoToken; 

app.use(express.json());

app.listen(3000, () => {
    console.log('server iniciado');
});
 




// -----------------CREACION Y VALIDACION DE USUARIO------------------------//




app.post('/usuarios', async function(req,res){

    const {username, fullname, email, phone, adress, pass, admin} = req.body;
    
    if(!username || !fullname || !email || !phone || !adress || !pass) {
        res.status(400).json('Todos los campos deben estar completos');
    } else {
        try {
            let data = await sequelize.query('INSERT INTO user (username, fullname, email, phone, adress, pass, admin) VALUES (?, ?, ?, ?, ?, ?, ? )',
            {
                replacements: [username, fullname, email, phone, adress, pass, admin],
                type: sequelize.QueryTypes.INSERT
            });
            console.log(data);
            res.status(200).json(`El usuario ${req.body.username} creado correctamente`);
        } catch (error) {
            console.log(error);
            res.status(500).json('Error de servidor');
        }      
    }
});




// -----------------------TRAER EL LISTADO DE USUARIOS (GET)-------------------------//



app.get('/usuarios/:user_id', validacionjwt, async function(req, res) {
    const {user_id} = req.params;
    console.log('req info token')
    console.log(req.infoToken, user_id)
    console.log('req info token')
    try {
    if(user_id == req.infoToken.user_id){
        let data = await sequelize.query('SELECT * FROM user WHERE user_id= ?',
        {
            replacements: [user_id],
            type: sequelize.QueryTypes.SELECT
        });
        console.log(data);
        res.status(200).json(data);
    }else{
        res.status(400).json('El usuario que intenta buscar no pertence al user id')
    }
       
    } catch (error) {
        console.log(error);
        res.status(500).json('Error de servidor');
    }
});



// ---------------------- POST (LOGUIN)---------------------------------------------//

// app.post('/usuarios/login', (req,res)=>{
//     res.send('hola')
// })
app.post('/usuarios/login', async function(req, res) {
    const {email, pass} = req.body;

    try {
        const data = await sequelize.query('SELECT * FROM user WHERE email = ? AND pass = ?',
        {
            replacements: [email, pass],
            type: sequelize.QueryTypes.SELECT
        });

        if(data.length == 0) {
            res.status(400).json('Error de LogIn');
        } else {
            let dataToken = {
                'user_id': data[0].user_id,
                'email': data[0].email,
                'fullname': data[0].fullname,
                'admin': data[0].admin
            };
            console.log('dataToken')
            console.log(dataToken)
            console.log('dataToken')
            req.infoToken = jwt.sign(dataToken, tokenKey, { expiresIn: '1h' });
            console.log('ínfor cifrada')
            
            console.log(jwt.verify(req.infoToken,tokenKey))
            console.log('infor cifrada')
            res.status(200).json({ status: "Logueo exitoso", token: req.infoToken });
        }
    } catch (err) {
        console.log('error' + err);
    }

});



// ------------------------------------PRODUCTOS (POST)---------------------------------------------------



app.post('/productos', validateProduct, validateAdminJWT,  async (req,res) => {
    const {product_id, name, price, img_url} = req.body;
    const active = 1;

    if (product_id && name && price && img_url) {
        try {
            const productData = await sequelize.query('INSERT INTO product (product_id, name, price, img_url) VALUES (?, ?, ?, ?)',
        {
            replacements: [product_id, name, price, img_url, active],
            type: sequelize.QueryTypes.INSERT,
        });
        console.log(productData);
        res.status(200).json('Producto creado exitosamente');
        } catch (error) {
            console.log('error' + error);
            res.status(400).json('Error al crear el producto, intente nuevamente');
        }
    } else {
        res.status(400).json('Error, faltan datos');
    }
});



// -----------------------------------------PRODUCTOS (GET)--------------------------------------------



app.get('/productos', validationJwtUser, async function (req,res) {
    
    try {
        const dataProduct = await sequelize.query('SELECT * FROM product', {
            type: sequelize.QueryTypes.SELECT,
        });
        res.status(200).json(dataProduct);
    } catch (error) {
        console.log('error' + error);
    }
});




// -------------------------------PRODUCTOS (PATCH)------------------------------------------//

app.patch('/productos/:product_id', validateAdminJWT, async function (req, res) {
    const {price, img_url, name} = req.body;
    const product_id = req.params.product_id;
    
    try {
        const selectProduct = await sequelize.query('SELECT product_id FROM product WHERE product_id = ?', 
        {
            replacements: [product_id],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectProduct.length != 0) {
            if (price && img_url && name) {
                try {
                    const updateProduct = await sequelize.query('UPDATE product SET price = ?, name = ?, img_url = ? WHERE product_id = ?', 
                    {
                        replacements: [price, name, img_url, product_id],
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('El producto se ha modificado correctamente');
                } catch (error) {
                    console.log('Error' + error);
                }
            } else {
                res.status(400).json('Error al modificar el producto, intente nuevamente');
            }
        } else {
            res.status(500).json('Error interno del servidor');
        }
    } catch (error) {
        console.log('Error' + error);
    }
});



// -------------------------------PRODCUTOS(DELETE)----------------------------------------//


app.delete('/productos/:product_id', validateAdminJWT, async function (req, res) {
    const active = 0;
    const product_id = req.params.product_id;

    try {
        const selectProduct = await sequelize.query('SELECT product_id FROM product WHERE product_id = ?', 
        {
            replacements: [product_id],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectProduct.length != 0) {
                try {
                    const updateProductForDelete = await sequelize.query('UPDATE product SET active = ? WHERE product_id = ?', 
                    {
                        replacements: [active, product_id],
                        type: sequelize.QueryTypes.UPDATE
                    });
                    res.status(200).json('El producto ha sido desactivado correctamente');
                } catch (error) {
                    console.log('Error' + error);
                }
            } else {
                res.status(400).json('Error al desactivar el producto, intente nuevamente');
            }
    } catch (error) {
        console.log('Error' + error);
    }
});




// ------------------------PEDIDOS (POST, GET, PATCH, DELETE)------------------------------//

app.post('/pedidos', validateOrderData, validationJwtUser, async function (req, res) {
    const {total, pay_method_id, items} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const verificarToken = jwt.verify(token, tokenKey);
    const user_id = verificarToken.user_id;
    try {
        const order = await sequelize.query('INSERT INTO orders (total, status_id, pay_method_id, user_id, active) VALUES (?, ?, ?, ? ,?)', 
        {
            replacements: [total, 1, pay_method_id, user_id, 1],
            type: sequelize.QueryTypes.INSERT
        });
        const order_id = await sequelize.query('SELECT @@identity AS order_id from orders WHERE user_id = ?'
        , 
        {
            replacements: [user_id],
            type: sequelize.QueryTypes.SELECT
        });
        console.log('order_id');
        console.log(order_id);
        console.log("order_id");
        for await (const elemento of items) {
            console.log(items);
            sequelize.query('INSERT INTO product_order (order_id, product_id, quantity) VALUES (?, ?, ?)', 
            {
                replacements: [order_id[0].order_id, elemento.product_id, elemento.quantity],
            });
        };
        res.status(200).json('El pedido se ha creado correctamente');
    } catch (error) {
        console.log('error' + error);
    }
});



app.get('/pedidos/:order_id', validationJwtUser, async function (req, res) {
    const order_id = req.params.order_id;
    console.log(req.infoToken);
    try {
        let orderExistente = await sequelize.query('SELECT * FROM orders WHERE order_id = ?', 
                {
                    replacements: [order_id],
                    type: sequelize.QueryTypes.SELECT
                });
                console.log(orderExistente);
        if (req.infoToken.user_id == orderExistente[0].user_id && orderExistente[0].active == 1) {
            
            let dataGetOrder = await sequelize.query('SELECT user.user_id, user.email, user.fullname, user.phone, user.adress, orders.order_id, orders.total, status_order.status_name, payment_method.pay_method_name FROM orders INNER JOIN user ON orders.user_id = user.user_id INNER JOIN status_order ON orders.status_id = status_order.status_id INNER JOIN payment_method ON orders.pay_method_id = payment_method.pay_method_id  WHERE orders.order_id = ?', 
            {
                replacements: [order_id],
                type: sequelize.QueryTypes.SELECT
            });
            let dataGetItems = await sequelize.query('SELECT * FROM product_order WHERE order_id = ?', 
            {
                replacements: [order_id],
                type: sequelize.QueryTypes.SELECT
            });
            console.log(dataGetItems);
           let orderAndItems = {
                pedidos: dataGetOrder,
                items: dataGetItems
            };
            
            res.status(200).json(orderAndItems); 
        } else {
            
            if(orderExistente.length == 0) {
                res.status(400).json('Pedido no encontrado, Este pedido no existe');
            } else {
                res.status(401).json('Pedido inexistente para el usuario');
            }
        }
        
    } catch (err) {
        console.log('error' + err);
    }
});





// app.get('/pedidos/:order_id', validationJwtUser, async function (req, res) {
//     const order_id = req.params.order_id;
//     let orderExistente = await sequelize.query('SELECT order_id FROM orders WHERE order_id = ?', 
//     {
//         replacements: [order_id],
//         type: sequelize.QueryTypes.SELECT
//     });
//     if(orderExistente.length == 0) {
//         res.status(400).json('Pedido no encontrado, Este pedido no existe');
//     } else {
//         if (req.infoToken.user_id == orderExistente[0].user_id && orderExistente[0].active == 1) {
//             try {
//                 let dataGetOrder = await sequelize.query('SELECT user.user_id, user.email, user.fullname, user.phone, user.address, orders.order_id, orders.total, status_order.status_name, payment_method.pay_method_name FROM orders INNER JOIN user ON orders.user_id = user.user_id INNER JOIN status_order ON orders.status_id = status_order.status_id INNER JOIN payment_method ON orders.pay_method_id = payment_method.pay_method_id  WHERE orders.order_id = ?', 
//                 {
//                     replacements: [order_id],
//                     type: sequelize.QueryTypes.SELECT
//                 });
//                 let dataGetItems = await sequelize.query('SELECT product_order.product_id, product_order.quantity FROM product_order WHERE product_order.order_id = ?', 
//                 {
//                     replacements: [order_id],
//                     type: sequelize.QueryTypes.SELECT
//                 });
//                 orderAndItems = {
//                     pedidos: dataGetOrder,
//                     items: dataGetItems
//                 };
//                 res.status(200).json(orderAndItems);
//             } catch (error) {
//                 console.log('error' + err);
//             }
            
//         } else {
//             res.status(401).json('Pedido inexistente para el usuario');
//         }
//     }
// });





app.patch('/pedidos/:order_id', validateAdminJWT, async function (req, res)  {
    const {status_id} = req.body;
    const order_id = req.params.order_id;

    try {
        const orderExistente = await sequelize.query('SELECT order_id FROM orders WHERE order_id = ?', 
        {
            replacements: [order_id],
            type: sequelize.QueryTypes.SELECT
        });
        if (orderExistente.length != 0) {
            if (status_id) {
                const UpdateOrder = await sequelize.query('UPDATE orders SET status_id = ? WHERE order_id = ?', 
                {
                    replacements: [status_id, order_id],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El pedido ha sido modificado exitosamente!');
            } else {
                res.status(400).json('No se ha podido modificar su pedido, intente nuevamente');
            }
        }
    } catch (error) {
        console.log('error' + error);
    }
});




app.delete('/pedidos/:order_id', validateAdminJWT, async function (req, res) {
    const order_id = req.params.order_id;
    const active = 0
    
    try {
        const selectOrder = await sequelize.query('SELECT order_id FROM orders WHERE order_id = ?', 
        {
            replacements: [order_id],
            type: sequelize.QueryTypes.SELECT
        });
        if (selectOrder.length != 0) {
            try {
                const deleteOrder = await sequelize.query('UPDATE orders SET active = ? WHERE order_id = ?', 
                {
                    replacements: [0, order_id],
                    type: sequelize.QueryTypes.UPDATE
                });
                res.status(200).json('El pedido ha sido dado de baja con exito!');
            } catch (error) {
                console.log('error' + error);
            }
        } else {
            res.status(400).json('Error al dar de baja el pedido, intente nuevamente');
        }

    } catch (error) {
        console.log('Error' + error);
    }
});