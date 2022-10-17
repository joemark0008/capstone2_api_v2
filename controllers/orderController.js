
const Order = require('../models/Order');
const User = require('../models/User');

module.exports.addOrder = (data, requestBody) => {

    return User.findById(data.id).then(result => {
        // console.log(data.id)

        if (result.isAdmin === false) {

            let newOrder = new Order({
                orderUser : data.id,
                orderedProduct: [
                    {
                        productName: "test1",
                        quantity: 2,
                        price: 2,
                        subTotal: 2
                    },
                    {
                        productName: "test2",
                        quantity: 2,
                        price: 2,
                        subTotal: 2
                    },
                ],
                totalAmount: 2

            })

            return newOrder.save()

        } else {

            return 'Authorized admin only'
        }
    })
}