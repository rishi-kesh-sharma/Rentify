const express = require('express');
const router = express.Router();
const reservationClaimModule = require('../../modules/reservationClaim/reservationClaimController.js');
const { authentication, authorization } = require('../../middleware/auth.middleware');
const { sanitize, validate } = require('../../modules/reservationClaim/reservationClaimValidation.js');

router.get('/', authentication, reservationClaimModule.getReservationClaimNonAuthorize);
router.get('/latest', authentication, reservationClaimModule.getLatestReservationClaim);
router.get('/trending', authentication, reservationClaimModule.getTrendingrentInReservation);
router.get('/reservationClaimById/:id', authentication, reservationClaimModule.getReservationClaimById);
router.get('/reservationClaimByClaimer/:claimer', authentication, reservationClaimModule.getReservationClaimByClaimer);
router.get('/reservationClaimByPost/:postId', authentication, reservationClaimModule.getReservationClaimByPost);
router.get('/reservationClaimByTime', authentication, reservationClaimModule.getReservationClaimArchives);
router.get('/reservationClaimByTime/:time', authentication, reservationClaimModule.getReservationClaimByDate);
router.get('/:id', authentication, reservationClaimModule.getReservationClaimDetail);

router.post('/', authentication, sanitize, validate, reservationClaimModule.saveReservationClaim);
router.post('/multiple/reservationClaim', authentication, authorization, reservationClaimModule.selectMultipleDataReservationClaim);
router.delete('/:id', authentication, reservationClaimModule.deleteReservationClaim);
module.exports = router;
