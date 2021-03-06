const User = require("../../models/user");
const bcrypt = require("bcrypt");
const  passport  = require("passport");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");

    },
    postLogin(req,res,next){


       const {email, password } = req.body;
       //validation correct or error :
       if ( !email || !password) {
         req.flash("error", "All fields are required");
         return res.redirect("/login");
       }


      passport.authenticate('local' , (err,user,info) =>{

        if (err){
          req.flash('error' ,info.message)
          return next(err)
        }

        if (!user){
          req.flash("error", info.message);
          return res.redirect('/login');
        }


        req.logIn(user, () => {
          if (err){
            req.flash("error", info.message);
            return next(err);
          }


          return res.redirect('/')

        })
      })(req, res, next)
    },
    register(req, res) {
      res.render("auth/register");
    },

    async postRegister(req, res) {
      const { name, email, password } = req.body;
      //validation correct or error :

      if (!name || !email || !password) {
        req.flash("error", "All fields are required");
        req.flash("name", name);
        req.flash("email", email);

        return res.redirect("/register");
      }

      //check if email exists

      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });

      //Hash password

      const hashPassword = await bcrypt.hash(password, 10);

      //create new user

      const user = new User({
        name: name,
        email: email,
        password: hashPassword,
      });

      user
        .save()
        .then((user) => {
          //registration Login

          return res.redirect("/");
        })
        .catch((err) => {
          //if we get error
          req.flash("error", "something went wrong ");
          return res.redirect("/register");
        });

      console.log(req.body);
    },


    //Logout route using passport.js
    logout (req,res){
      req.logout ()
      return res.redirect ('/login')
    }
  };
}

module.exports = authController;
