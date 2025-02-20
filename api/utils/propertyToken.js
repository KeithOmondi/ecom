// Creating property token and saving it in cookies
const sendPropertyToken = (property, statusCode, res) => {
  const token = property.getJwtToken(); // Changed user → property

  // Cookie options
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode)
     .cookie("propertyToken", token, options) // Changed "agent_token" → "propertyToken"
     .json({
        success: true,
        property, // Changed user → property
        token,
     });
};

module.exports = sendPropertyToken;
