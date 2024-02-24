const express = require('express');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const router = express.Router();
const adminDashboardController = require('./../../modules/adminDashboard/adminDashboardController');

router.get('/info', adminDashboardController.getRentifyInfo);
router.get('/error', authentication, authorization, adminDashboardController.GetErrorsGroupBy);
router.get('/user/days/:day', authentication, authorization, adminDashboardController.getLastXDayUserRegistration);
router.get('/user/registration', authentication, authorization, adminDashboardController.getNoOfCustomerByRegistration);
router.get('/user/recent', authentication, authorization, adminDashboardController.getLatestFiveUsers);
router.get('/user/roles', authentication, authorization, adminDashboardController.GetAllUserGroupBy);
router.get('/user/blogs', authentication, authorization, adminDashboardController.getNoOfBlogByBlogWriter);
router.get('/rent/days/:day', authentication, authorization, adminDashboardController.getLastXDayrentRegistration);
router.get('/rent/category', authentication, authorization, adminDashboardController.getNoOfrentByCategory);
router.get('/rent/sub_category', authentication, authorization, adminDashboardController.getNoOfrentBySubCategory);

module.exports = router;
