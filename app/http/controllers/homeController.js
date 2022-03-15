const Menu = require("../../models/menu");

function homeController() {
  return {
    async index(req, res) {
      //address from database

      const pizzas = await Menu.find();
      return res.render("home", { pizzas: pizzas });

      // rendering home page :
    },
  };
}

module.exports = homeController;
