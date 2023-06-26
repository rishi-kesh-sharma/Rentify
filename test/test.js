const crypto = require("crypto");
// Generate a random salt of specified length
const generateSalt = (length) => {
  return crypto.randomBytes(Math.ceil(length / 2)).toString("base64");
  // .slice(0, length);
};

// Usage example
const saltLength = 16; // Desired salt length in bytes
const salt = generateSalt(saltLength);
console.log("Generated Salt:", salt);
const str = "Hello, world!";
const buffer = Buffer.from(str);
const size = Buffer.alloc(5);
console.log(size);
