const bcrypt = require('bcryptjs')
const saltRounds = process.env.BCRYPT_SALT || 8;
console.log(saltRounds)
const hashPassword = async (userPassword) => {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(userPassword , salt, function(err, hash) {
            if(err) {
                console.log(err.message);
                return;
            }
            return hash;
        });
    });
}

const verifyHashedPassword = async (userPassword, hashedPassowrd) => {
  return await bcrypt.compare(userPassword, hashedPassowrd);
}

module.exports = {
    hashPassword,
    verifyHashedPassword
}