module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs",{title:"Welcome Page",user:req.user});
  },
};
