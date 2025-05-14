const jwt= require('jsonwebtoken');

const generateToken= (userId)=>{
    return jwt.sign(
        {
            id: userId
        },
        process.env.SECRET_KEY,
        {
            expiresIn: '7d'
        }
    );


}

module.exports = generateToken;