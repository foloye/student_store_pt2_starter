const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Order {
    static async listOrdersForUser(user) {
        const userId = await db.query(`SELECT id FROM users WHERE email = $1;`,[user.email])
        const orderId = userId.rows[0].id
        
        const query = `SELECT orders.id AS "orderId", orders.customer_id AS "customerId", order_details.quantity AS "quantity", products.name AS "name", products.price AS "price" FROM orders 
        INNER JOIN order_details ON  order_details.order_id = orders.id
        INNER JOIN products ON products.id = order_details.product_id
        WHERE orders.customer_id = $1; `
        const userOrders = await db.query(query, [orderId])
        return userOrders.rows
    }
    static async createOrder({user, order}) {
        const userId = await db.query(`SELECT id FROM users WHERE email = $1;`,[user.email])


        const orderId = await db.query(
            `INSERT INTO orders (customer_id)
             VALUES ($1)
             RETURNING customer_id;
            `,
            [userId]
        )
    
      
        order.forEach((product) => {
            const query =`INSERT INTO order_details (order_id, product_id, quantity, discount)
                 VALUES ($1, $2, $3, $4)
                 RETURNING order_id;
                `;
            db.query(query,[orderId, product.id, product.quantity, product.discount])
        })
       //will take in an order and store it in the database in th correct places
       
    }
  
}

module.exports = Order
