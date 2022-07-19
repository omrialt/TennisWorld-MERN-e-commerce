# TennisWorld-MERN-e-commerce

> eCommerce platform using MERN stack & Redux.

## Website

https://omrialtennis.herokuapp.com/

## Features

- Full featured shopping cart and wishlist
- Product reviews and ratings
- Top products carousel
- Product search feature
- Product screen with similar brand & category suggestions in the bottom
- Product add,edit and delete
- User profile with orders and update
- Admin management and stats page
- Checkout process
- PayPal / credit card integration
- Mailer to send mails when user register,create order, pay and deliver

## Usages

Env Variables
Create a .env file in then root and add the following

```javascript
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = your own string
PAYPAL_CLIENT_ID = your paypal client id
MAILER_API_KEY = your mailer api key
MAIL_FROM=your mail
```

deploy with heroku