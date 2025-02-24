const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // Cookie options
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: "none",
        secure: true,
    };

    res.status(statusCode)
       .cookie("token", token, options)
       .json({ // ✅ Fixed `.json()`
          success: true,
          user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              role: user.role, // ✅ Ensure role is included
          },
          token
       });
};

module.exports = sendToken;
