module.exports = {
  getIndex: (req, res) => {
    if (req.user) {
      res.render("index.ejs", { title: "Welcome Page", user: req.user });
    }
    res.render("login", {
      title: "Login",
      user: req.user,
    });
  },
};
