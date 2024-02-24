const httpStatus = require('http-status');
const isEmpty = require('../../validation/isEmpty');
const reservationClaimConfig = require('./reservationClaimConfig');
const otherHelper = require('../../helper/others.helper');
const sanitizeHelper = require('../../helper/sanitize.helper');
const validateHelper = require('../../helper/validate.helper');
const validation = {};

validation.sanitize = (req, res, next) => {
  const sanitizeArray = [
    {
      field: 'claimed_to',
      sanitize: {
        trim: true,
      },
    },
  ];
  sanitizeHelper.sanitize(req, sanitizeArray);
  next();
};

validation.validate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'claimed_to',
      validate: [
        {
          condition: 'IsEmpty',
          msg: reservationClaimConfig.validate.empty,
        },
        {
          condition: 'IsMongoId',
          msg: reservationClaimConfig.validate.invalid,
        },
      ],
    },
  ];
  const errors = validateHelper.validation(data, validateArray);
  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, reservationClaimConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};

validation.countSanitize = (req, res, next) => {
  sanitizeHelper.sanitize(req, [
    {
      field: 'reservationClaim_id',
      sanitize: {
        trim: true,
      },
    },
    {
      field: 'count',
      sanitize: {
        trim: true,
      },
    },
  ]);
  next();
};
validation.countValidate = (req, res, next) => {
  const data = req.body;
  const validateArray = [
    {
      field: 'count',
      validate: [
        {
          condition: 'IsInt',
          msg: reservationClaimConfig.validate.isInt,
        },
      ],
    },
    {
      field: 'reservationClaim_id',
      validate: [
        {
          condition: 'IsMongoId',
          msg: reservationClaimConfig.validate.isMongoId,
        },
      ],
    },
  ];

  const errors = validateHelper.validation(data, validateArray);

  if (!isEmpty(errors)) {
    return otherHelper.sendResponse(res, httpStatus.BAD_REQUEST, false, null, errors, reservationClaimConfig.errorIn.inputErrors, null);
  } else {
    next();
  }
};
module.exports = validation;
