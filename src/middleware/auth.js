const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");
const CuentaAcceso = require('./../db/cuentaacceso')
const HttpException = require('../utils/HttpException.utils');

const auth = () => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const bearer = 'Bearer ';
            
            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }            
            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.JWT_TOKEN_SECRET || "";
            
            const decoded = jwt.verify(token, secretKey);            
            const user = await CuentaAcceso.findOne({
                id: decoded.user_id
            });          

            if (!user) {
                throw new HttpException(401, 'Authentication failed!');
            }
            const ownerAuthorized = req.params.id == user.id;
            if (!ownerAuthorized) {
                throw new HttpException(401, 'Unauthorized');
            }
            // if the user has permissions
            req.currentUser = user;
            next();

        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = auth;