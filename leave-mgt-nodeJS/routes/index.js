const express = require('express');
const router = express.Router();

const AccountController = require('../controllers/accountController');

router.get('/account', AccountController.getAllAccounts);
router.post('/account/login', AccountController.login);
router.post('/account/addaccount', AccountController.addAccount);
router.post('/account/addleave', AccountController.addLeave);
router.get('/account/getuser', AccountController.getUser);
router.get('/account/getuserleaves', AccountController.getUserLeaves);
router.get('/account/getallleaves', AccountController.getAllLeaves);
router.put('/account/updateleave', AccountController.updateLeave);
router.delete('/account/deleteleave', AccountController.deleteLeave);

module.exports = router;
