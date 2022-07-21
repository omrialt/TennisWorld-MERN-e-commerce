import Order from "../models/orderModel.js";
import { validateOrder } from "../models/orderModel.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid-transport";

dotenv.config();

const trasporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.MAILER_API_KEY,
    },
  })
);

//action-create new order
//method-POST
//route-/api/orders
//access-protect
const addOrderItems = asyncHandler(async (req, res) => {
  const { error } = validateOrder(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return res.status(404).json({ message: "Orders not found" });
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const items = await orderItems.map((product) => {
      return {
        qty: product.qty,
        productId: product.productId,
      };
    });
    for (const item of items) {
      const pro = await Product.findById(item.productId);
      pro.countInStock -= +item.qty;
      pro.sold += +item.qty;

      pro.inOrders.push({
        orderId: order._id,
        createdAt: new Date(),
        count: +item.qty,
        user: req.user,
      });
      await pro.save();
    }
    const { name, email } = req.user;
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
    await trasporter.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: `There is your order`,
      html: `<h2>Hey ${name}!</h2>
      <p>There is your order details</p>
      <table style="border:1px">
      <thead>
      <tr>
      <th>items price</th>
      <th>tax price</th>
      <th>shipping price</th>
      <th>total price</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>$${itemsPrice}</td>
      <td>$${taxPrice}</td>
      <td>$${shippingPrice}</td>
      <td>$${totalPrice}</td>
      </tr>
      </tbody>
      </table>
      <table style="border:1px;">
      <thead>
      <tr>
      <th>item</th>
      <th>price</th>
      <th>quantity</th>
      <th>total price</th>
      </tr>
      </thead>
      <tbody>
      ${orderItems.map((item) => {
        return `<tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.qty}</td>
          <td>$${(item.qty * item.price).toFixed(2)}</td>
          </tr>`;
      })}
      </tbody>
      </table>
      `,
    });
  }
});

//action-get order by id
//method-GET
//route-/api/orders/:id
//access-protect
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (order) {
    res.json(order);
  } else {
    return res.status(404).json({ message: "Order not found" });
  }
});

//action-update order to paid
//method-PUT
//route-/api/orders/:id/pay
//access-protect
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const userPaid = await User.findById(req.user._id);
    const updatedOrder = await order.save();
    res.json(updatedOrder);

    await trasporter.sendMail({
      to: userPaid.email,
      from: process.env.MAIL_FROM,
      subject: `Paid succeeded-order ${order._id}!`,
      html: `<h2>Hey ${userPaid.name}!</h2>
      <p>We received your pay for order ${order._id} ($${
        order.totalPrice
      }) and we make a deliver to you soon</p>
      <table style="border:1px">
      <thead>
      <tr>
      <th>items price</th>
      <th>tax price</th>
      <th>shipping price</th>
      <th>total price</th>
      </tr>
      </thead>
      <tbody>
      <tr>
      <td>$${+(order.totalPrice - order.shippingPrice - order.taxPrice).toFixed(
        2
      )}</td>
      <td>$${order.taxPrice}</td>
      <td>$${order.shippingPrice}</td>
      <td>$${order.totalPrice}</td>
      </tr>
      </tbody>
      </table>
      <table style="border:1px;">
      <thead>
      <tr>
      <th>item</th>
      <th>price</th>
      <th>quantity</th>
      <th>total price</th>
      </tr>
      </thead>
      <tbody>
      ${order.orderItems.map((item) => {
        return `<tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.qty}</td>
          <td>$${item.qty * item.price}</td>
          </tr>`;
      })}
      </tbody>
      </table>
      `,
    });
  } else {
    return res.status(404).json({ message: "Order not found" });
  }
});

//action-update order to delivered
//method-PUT
//route-/api/orders/:id/delivered
//access-protect,admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();
    res.json(updatedOrder);
    const userPaid = await User.findById(updatedOrder.user);
    await trasporter.sendMail({
      to: userPaid.email,
      from: process.env.MAIL_FROM,
      subject: `Your order was shipped-order ${order._id}!`,
      html: `<h2>Hey ${userPaid.name}!</h2>
      <p>We shipped your order ${order._id} and you will get it soon</p>
      <table style="border:1px;">
      <thead>
      <tr>
      <th>item</th>
      <th>price</th>
      <th>quantity</th>
      <th>total price</th>
      </tr>
      </thead>
      <tbody>
      ${order.orderItems.map((item) => {
        return `<tr>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td>${item.qty}</td>
          <td>$${(item.qty * item.price).toFixed(2)}</td>
          </tr>`;
      })}
      </tbody>
      </table>
      `,
    });
  } else {
    return res.status(404).json({ message: "Order not found" });
  }
});
//action-get user orders
//method-GET
//route-/api/orders/myorders
//access-protect
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({
    createdAtTime: -1,
  });

  res.json(orders);
});

//action-get all orders
//method-GET
//route-/api/orders
//access-protect,admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .sort({ createdAtTime: -1 })
    .populate("user", "id name");
  res.json(orders);
});
//action-get top 5 sold products
//method-GET
//route-/api/orders/topsales
//access-protect,admin
const getTopProductsSold = asyncHandler(async (req, res) => {
  const products = await Product.find({ sold: { $gt: 0 } })
    .sort({ sold: -1 })
    .limit(5);
  res.json(products);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
  getTopProductsSold,
};
