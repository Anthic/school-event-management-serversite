const crypto = require("crypto");

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hashed = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hashedPassword: hashed, salt };
}

function verifyPassword(password, hashedPassword, salt) {
  const checkHash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return checkHash === hashedPassword;
}

module.exports = { hashPassword, verifyPassword };
