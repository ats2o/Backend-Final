// Import the bcryptjs library
const bcryptjs = require("bcryptjs")

// Define an asynchronous function to encrypt a clear password
const encrypt = async (clearPassword) => {
    // Generate a hash of the clear password with a salt of 10 rounds
    const hash = await bcryptjs.hash(clearPassword, 10)
    // Return the generated hash
    return hash
}

// Define an asynchronous function to compare a clear password with a hashed password
const compare = async (clearPassword, hashedPassword) => {
    // Compare the clear password with the hashed password
    const result = await bcryptjs.compare(clearPassword, hashedPassword)
    // Return the result of the comparison (true or false)
    return result
}

// Export the encrypt and compare functions as a module
module.exports = { encrypt, compare }