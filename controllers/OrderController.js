const Menu = require('../models/MenuModel')
const Table = require('../models/TableModel')
const Order = require('../models/OrderModel')

class RestaurantController {

  static getSummaryOrderFood(request, response) {
    let restaurantId = request.params.restaurantId

    Order.find({ 'restaurant': restaurantId })
      .populate('tableId')
      .populate('menuId')
      .exec()
      .then((data) => {

        let result = {}
        data.forEach((order) => {
          if (result[order.menuId._id]) {
            result[order.menuId._id] = {
              name: order.menuId.name,
              quantity: order.quantity + result[order.menuId._id].quantity
            }
          }
          else {
            result[order.menuId._id] = {
              name: order.menuId.name,
              quantity: order.quantity
            }
          }
        })

        let finalResult = []
        Object.keys(result).forEach((key) => {
          finalResult.push({ name: result[key].name, quantity: result[key].quantity })
        })

        response.json({
          data: finalResult,
          message: 'success'
        });
      })
      .catch((err) => {
        response.status(500).json({
          message: err
        });
      })
  }


  static getSummaryOrderCategory(request, response) {
    let restaurantId = request.params.restaurantId

    Order.find({ 'restaurant': restaurantId })
      .populate('tableId')
      .populate('menuId')
      .exec()
      .then((data) => {
        let result = {}
        data.forEach((order) => {
          if (result[order.menuId.category]) {
            result[order.menuId.category] = {
              category: order.menuId.category,
              quantity: order.quantity + result[order.menuId.category].quantity
            }
          }
          else {
            result[order.menuId.category] = {
              category: order.menuId.category,
              quantity: order.quantity
            }
          }
        })

        let finalResult = []
        Object.keys(result).forEach((key) => {
          finalResult.push({ name: result[key].category, quantity: result[key].quantity })
        })

        response.json({
          data: finalResult,
          message: 'success'
        });
      })
      .catch((err) => {
        response.status(500).json({
          message: err
        });
      })
  }


}

module.exports = RestaurantController