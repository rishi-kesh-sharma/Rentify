const express = require('express');
const router = express.Router();
const rentModule = require('../../modules/rent/rentController.js');
const { authentication, authorization } = require('../../middleware/auth.middleware.js');
const { catSanitize, catValidate, sanitize, validate, countValidate, countSanitize, subCatSanitize, subCatValidate } = require('../../modules/rent/rentValidation.js');
const uploaderHelper = require('../../helper/upload.helper.js');

router.get('/auth', authentication, authorization, rentModule.getRentAuthorize);
router.get('/', authentication, rentModule.getRentNonAuthorize);
router.get('/public', rentModule.getRentUnauthorize);
router.get('/highlight', rentModule.getHighlightRent);
router.get('/latest', rentModule.getLatestRent);
router.get('/showcase', rentModule.getShowcaseRent);
router.get('/trending', rentModule.getTrendingRent);
router.get('/latest/:cat_id', rentModule.getLatestRentByCat);
router.get('/related/:slug_url', rentModule.getRelatedRent);
router.get('/category', rentModule.getRentCategory);
router.get('/sub_category', rentModule.getRentSubCategory);
router.get('/category/active', rentModule.getRentCategoryActive);
router.get('/sub_category/active', rentModule.getRentSubCategoryActive);
router.get('/category/:id', rentModule.getRentCatById);
router.get('/rent/:slug_url', rentModule.getRentBySlug);
router.get('/rentById/:id', rentModule.getRentById);
router.get('/rentByCat/:slug_url', rentModule.getRentByCat);
router.get('/rentByTag/:tag', rentModule.getRentByTag);
router.get('/rentByCreator/:creator', rentModule.getRentByCreator);
router.get('/rentByTime', rentModule.getRentArchives);
router.get('/rentByTime/:time', rentModule.getRentByDate);
router.post(
  '/user',
  authentication,
  // authorization,
  // uploaderHelper.uploadFiles('public/rent/', 'fields', [
  //   { name: 'main_image', maxCount: 1 },
  //   { name: 'images', maxCount: 5 },
  // ]),
  sanitize,
  rentModule.SaveRent,
);
router.post(
  '/',
  authentication,
  authorization,
  uploaderHelper.uploadFiles('public/rent/', 'fields', [
    { name: 'main_image', maxCount: 1 },
    { name: 'images', maxCount: 5 },
  ]),
  sanitize,
  validate,
  rentModule.SaveRentAdmin,
);
router.post('/category', authentication, authorization, catSanitize, catValidate, rentModule.saveRentCategory);
router.post('/sub_category', authentication, authorization, subCatSanitize, subCatValidate, rentModule.saveRentSubCategory);
router.delete('/:id', authentication, authorization, rentModule.deleteRent);
router.delete('/category/:id', authentication, authorization, rentModule.deleteRentCat);
router.get('/count/category', rentModule.countAllRentByCat);
router.get('/count/increase/:id', countSanitize, countValidate, rentModule.updateViewCount);
router.get('/count/update/:id', authentication, countSanitize, countValidate, rentModule.updateLikeCount);
router.get('/count/category/:id', authentication, authorization, rentModule.countRentByCat);
router.get('/count/sub_category/:id', authentication, authorization, rentModule.countRentBySubCat);
router.post('/multiple/rent', authentication, authorization, rentModule.selectMultipleDataRent);
router.post('/multiple/category', authentication, authorization, rentModule.selectMultipleDataCat);
router.get('/myRents', authentication, rentModule.getMyRents);
router.get('/likedRents', authentication, rentModule.getLikedRents);
router.get('/category', rentModule.getRentCategory);
router.get('/sub_category', rentModule.getRentSubCategory);

module.exports = router;
