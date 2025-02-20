const bcrypt = require("bcryptjs");

const password = "Admin1234"; // Change this to your actual password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error("Error generating hash:", err);
  } else {
    console.log("Generated Hash:", hash);
  }
});
