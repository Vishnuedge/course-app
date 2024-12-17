const bcrypt = require('bcryptjs')
const saltRounds =  8;


const hashPassword = async (userPassword) => {
    return bcrypt.hash(userPassword, saltRounds, function(err, hash) {
        if(err){
            console.log(err);
            return err;
        };
        return hash;
    });
}

const verifyHashedPassword = async (userPassword, hashedPassowrd) => {
  return await bcrypt.compare(userPassword, hashedPassowrd);
}

module.exports = {
    hashPassword,
    verifyHashedPassword
}