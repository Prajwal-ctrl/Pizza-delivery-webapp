const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const guest = require("../app/http/middleware/guest");
const auth = require("../app/http/middleware/auth");
const orderController = require("../app/http/controllers/customers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");



function initRoutes(app) {
  app.get("/", homeController().index );

  app.get("/cart", cartController().index);

  app.get("/login",guest, authController().login);

  app.get("/register",guest, authController().register);

  app.post('/update-cart' , cartController().update)

  app.post("/register", authController().postRegister);

  app.post("/login", authController().postLogin);
  
  app.post("/logout", authController().logout);

  app.post("/orders", orderController().store);


  // customer routes : 

  app.post ( '/orders' ,auth,  orderController().store )

  app.get("/customer/orders",auth, orderController().index);


//admin routes : 

app.get("/admin/orders", auth, AdminOrderController().index);


}

module.exports = initRoutes;



