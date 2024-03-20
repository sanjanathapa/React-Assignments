const express = require( "express" );
const userRegisterController = require( "../controllers/userSchemaControllers" )


const router = express.Router();
router.post( '/register', userRegisterController.createUsers );
router.post('/sendOtp', userRegisterController.createOtp)

module.exports = router