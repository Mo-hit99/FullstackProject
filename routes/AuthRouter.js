const { Router }= require("express")
const authControllers= require('../controllers/authControllers');



const router =Router();



router.get('/signup',authControllers.get_signup);
router.get('/login',authControllers.get_login);
router.post('/signup',authControllers.post_signup);
router.post('/login',authControllers.post_login);
router.get('/logout',authControllers.get_logout);

module.exports=router;