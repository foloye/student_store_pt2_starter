const db = require("../db")
const { BadRequestError, UnauthorizedError } = require("../utils/errors")

class Store {
  static async listProducts() {
    
    const query = `SELECT * FROM products`

    const result = await db.query(query)

    const user = result.rows

    return user
  }
  
}

module.exports = Store
