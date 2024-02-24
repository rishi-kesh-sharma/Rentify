const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const reservationClaimSch = require('./reservationClaimSchema');
const reservationClaimConfig = require('./reservationClaimConfig');
const { getSetting } = require('../../helper/settings.helper');
const reservationClaimController = {};
const renderMail = require('./../template/templateController').internal;
const emailHelper = require('./../../helper/email.helper');

reservationClaimController.getLatestReservationClaim = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await reservationClaimSch
      .find({ is_active: true, is_deleted: false, is_published: true, published_on: { $lte: current_date } })
      .sort({ added_at: -1 })
      .skip(0)
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest reservation claims get success!', null);
  } catch (err) {
    next(err);
  }
};

reservationClaimController.selectMultipleDataReservationClaim = async (req, res, next) => {
  const { reservation_claim_id, type } = req.body;

  const Data = await reservationClaimSch.updateMany(
    { _id: { $in: reservation_claim_id } },
    {
      $set: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
};
reservationClaimController.getTrendingrentInReservation = async (req, res, next) => {
  try {
    const trendReservationrentId = await reservationClaimSch.aggregate([
      {
        $match: {
          date: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: '$claimed_to',
          sum: { $sum: '$count' },
        },
      },
      { $sort: { sum: -1 } },
      { $limit: 7 },
    ]);
    let ids = [];
    for (let i = 0; i < trendReservationrentId.length; i++) {
      ids = trendrentId[i]._id;
    }
    const current_date = new Date();
    const data = await reservationClaimSch
      .find({ is_deleted: false, _id: { $in: trendReservationrentId }, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'claimed_by',
        },
        {
          path: 'claimed_to',
        },
      ])
      .select({ claimed_by: 1, claimed_to: 1, status: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(6);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Trending rent post in terms of no of reservation claims get success!', null);
  } catch (err) {
    next(err);
  }
};
reservationClaimController.getReservationClaimArchives = async (req, res, next) => {
  try {
    const current_date = new Date();
    const reservationClaimArchives = await reservationClaimSch
      .find({ is_deleted: false })
      .populate([
        {
          path: 'claimed_by',
        },
        {
          path: 'claimed_to',
        },
      ])
      .select({ claimed_by: 1, claimed_to: 1, status: 1, added_at: 1 })
      .sort({ published_on: 1 })
      .skip(0)
      .limit(10);
    console.log(reservationClaimArchives[0].added_at);
    const month = [];
    const months = reservationClaimArchives.map((each) => {
      if (month.includes(each.added_at.getMonth())) {
        return null;
      } else {
        month.push(each.added_at.getMonth());
        return each.added_at;
      }
    });
    return otherHelper.sendResponse(res, httpStatus.OK, true, months, null, 'archives get success!', null);
  } catch (err) {
    next(err);
  }
};

reservationClaimController.getReservationClaimNonAuthorize = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 12, false);

    searchQuery = {
      claimed_by: req.user.id,
      ...searchQuery,
    };
    if (req.query.status) {
      searchQuery = {
        title: {
          $regex: req.query.status,
          $options: 'i',
        },
        ...searchQuery,
      };
    }

    populate = [
      {
        path: 'claimed_by',
      },
      {
        path: 'claimed_to',
      },
    ];
    selectQuery = 'claimed_by claimed_to status added_at';
    let reservationClaims = await otherHelper.getQuerySendResponse(reservationClaimSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, reservationClaims.data, reservationClaimConfig.get, page, size, reservationClaims.totalData);
  } catch (err) {
    next(err);
  }
};

reservationClaimController.getReservationClaimDetail = async (req, res, next) => {
  const id = req.params.id;
  const populate = [];
  const reservationClaim = await reservationClaimSch
    .findOne({
      _id: id,
      is_deleted: false,
    })
    .populate(populate);
  return otherHelper.sendResponse(res, httpStatus.OK, true, reservationClaim, null, reservationClaimConfig.get, null);
};

reservationClaimController.getReservationClaimById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const reservationClaims = await reservationClaimSch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate([
        {
          path: 'claimed_by',
        },
        {
          path: 'claimed_to',
        },
      ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, reservationClaims, null, reservationClaimConfig.get, null);
  } catch (err) {
    next(err);
  }
};

reservationClaimController.getReservationClaimByClaimer = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    const claimedById = req.params.claimer;
    populateq = [
      {
        path: 'claimed_by',
      },
      {
        path: 'claimed_to',
        populate: [
          {
            path: 'added_by posted_by',
          },
        ],
      },
    ];

    const current_date = new Date();
    searchQuery = { is_deleted: false, claimed_by: claimedById, added_at: { $lte: current_date } };
    const reservationClaimed = await otherHelper.getQuerySendResponse(reservationClaimSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    console.log(searchQuery);
    console.log(reservationClaimed);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, reservationClaimed.data, 'rents by claimer get success!', page, size, reservationClaimed.totalData);
  } catch (err) {
    next(err);
  }
};
reservationClaimController.getReservationClaimByPost = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;
    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    const postId = req.params.postId;
    populateq = [
      {
        path: 'claimed_by',
        populate: [{ path: 'roles' }],
      },
      // {
      //   path: 'claimed_to',
      //   populate: [
      //     {
      //       path: 'added_by posted_by',
      //     },
      //   ],
      // },
    ];
    const current_date = new Date();
    searchQuery = { is_deleted: false, claimed_to: postId, added_at: { $lte: current_date } };
    const reservationClaimed = await otherHelper.getQuerySendResponse(reservationClaimSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    console.log(reservationClaimed);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, reservationClaimed.data, 'reservation claims by post get success!', page, size, reservationClaimed.totalData);
  } catch (err) {
    next(err);
  }
};
reservationClaimController.getReservationClaimByDate = async (req, res, next) => {
  try {
    const size_default = 10;
    let page;
    let size;
    let searchQuery;
    let populateq;

    // let page =  assignPage(req.query.page);
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }

    // let size = assignSize(req.query.size);
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }

    let start = new Date(req.params.time);
    let end = new Date(req.params.time);
    end.setMonth(end.getMonth() + 1);

    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      published_on: { $lte: current_date },
    };
    if (start) {
      searchQuery = {
        added_at: {
          $gte: start,
          $lt: end,
        },
        ...searchQuery,
      };
    }
    populateq = [
      {
        path: 'claimed_by',
      },
      {
        path: 'claimed_to',
      },
    ];

    const tagReservationClaim = await otherHelper.getQuerySendResponse(reservationClaimSch, page, size, '', searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagReservationClaim.data, reservationClaimConfig.get, page, size, tagReservationClaim.totalData);
  } catch (err) {
    next(err);
  }
};
reservationClaimController.deleteReservationClaim = async (req, res, next) => {
  const id = req.params.id;
  const reservationClaim = await reservationClaimSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, reservationClaim, null, reservationClaimConfig.delete, null);
};

reservationClaimController.selectMultipleDataReservationClaim = async (req, res, next) => {
  const { reservation_claim_id, type } = req.body;

  const Data = await reservationClaimSch.updateMany(
    { _id: { $in: reservation_claim_id } },
    {
      $set: {
        is_deleted: true,
        deleted_at: new Date(),
      },
    },
  );
  return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
};

reservationClaimController.saveReservationClaim = async (req, res, next) => {
  try {
    let reservationClaims = req.body;
    if (reservationClaims && reservationClaims._id) {
      const update = await reservationClaimSch.findByIdAndUpdate(
        reservationClaims._id,
        {
          $set: reservationClaims,
        },
        { new: true },
      );

      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, reservationClaimConfig.save, null);
    } else {
      const hasAlreadyClaimed = await reservationClaimSch.findOne({ claimed_by: req.user.id, claimed_to: req.body.claimed_to });
      if (hasAlreadyClaimed) {
        return otherHelper.sendResponse(res, httpStatus.ALREADY_REPORTED, false, null, null, 'This reservation is already claimed!!', null);
      }
      reservationClaims.added_by = req.user.id;
      reservationClaims.claimed_by = req.user.id;
      reservationClaims.added_at = new Date();
      const newReservationClaim = new reservationClaimSch(reservationClaims);
      const reservationClaimSave = await newReservationClaim.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, reservationClaimSave, null, 'claim made successfully !!', null);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = reservationClaimController;
