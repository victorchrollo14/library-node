const showUserData = async (req, res) => {
  try {
    const currentUser = req.session.user;
    if (currentUser) {
      res.render("profile", { isLogin: true, user: currentUser });
    }
    res.render("profile", {
      isLogin: false,
      message: "You have not logged In",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export { showUserData };
