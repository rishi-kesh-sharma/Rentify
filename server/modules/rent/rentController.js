const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const rentConfig = require('./rentConfig');
const rentSch = require('./rentSchema');
const userSch = require('../user/userSchema');
const urlSlug = require('url-slug');
const rentViewCountSch = require('./rentViewCountSchema');
const rentCatSch = require('./categorySchema.js');
const rentSubCatSch = require('./subCategorySchema');
const moment = require('moment');
const rentController = {};
const objectId = require('mongoose').Types.ObjectId;
const HttpStatus = require('http-status');
rentController.getRentAuthorize = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      {
        path: 'posted_by',
        select: '_id name',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ];
    selectQuery = 'title description likes location map_iframe price frequency situated_floor near_by_places is_available amenities category sub_category posted_by short_description meta_tag meta-description keywords slug_url is_published published_on is_active image added_by added_at updated_at updated_by is_highlight is_showcase';
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_category) {
      searchQuery = { ...searchQuery, category: req.query.find_category };
    }
    if (req.query.find_posted_by) {
      searchQuery = { ...searchQuery, posted_by: req.query.find_posted_by };
    }
    if (req.query.find_is_published) {
      searchQuery = { ...searchQuery, is_published: req.query.find_is_published };
    }
    if (req.query.find_is_highlight) {
      searchQuery = { ...searchQuery, is_highlight: req.query.find_is_highlight };
    }
    if (req.query.find_is_active) {
      searchQuery = { ...searchQuery, is_active: req.query.find_is_active };
    }
    if (req.query.find_is_showcase) {
      searchQuery = { ...searchQuery, is_showcase: req.query.find_is_showcase };
    }
    if (req.query.find_published_on && !(req.query.find_published_on == 'Invalid date')) {
      const date_old = new Date(req.query.find_published_on);
      const date_one = new Date(date_old.getTime() + 86400000);
      searchQuery = {
        published_on: { $gte: date_old, $lte: date_one },
        ...searchQuery,
      };
    }
    let rents = await otherHelper.getQuerySendResponse(rentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    let published = await rentSch.countDocuments({ is_published: true, is_deleted: false });
    let active = await rentSch.countDocuments({ is_active: true, is_deleted: false });
    let highlight = await rentSch.countDocuments({ is_highlight: true, is_deleted: false });
    let showcase = await rentSch.countDocuments({ is_showcase: true, is_deleted: false });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rents.data, { published, active, highlight, showcase }, page, size, rents.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getLatestRent = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await rentSch
      .find({ is_active: true, is_deleted: false, is_published: true, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name image',
        },
        {
          path: 'added_by',
          select: '_id name image',
        },
        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1, main_image: 1, price: 1, frequency: 1, added_by: 1, amenities: 1, location: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(8);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rent post get success!', null);
  } catch (err) {
    next(err);
  }
};
rentController.getShowcaseRent = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await rentSch
      .find({ is_active: true, is_deleted: false, is_published: true, is_showcase: true, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name image',
        },
        {
          path: 'added_by',
          select: '_id name image',
        },
        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1, main_image: 1, image: 1, posted_by: 1, frequency: 1, price: 1, amenities: 1, location: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(6);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rent get success!', null);
  } catch (err) {
    next(err);
  }
};

rentController.selectMultipleDataRent = async (req, res, next) => {
  const { rent_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await rentSch.updateMany({ _id: { $in: rent_id } }, [
      {
        $set: {
          is_published: { $not: '$is_published' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else if (type == 'is_active') {
    const Data = await rentSch.updateMany({ _id: { $in: rent_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentSch.updateMany(
      { _id: { $in: rent_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

rentController.selectMultipleDataCat = async (req, res, next) => {
  const { rent_category_id, type } = req.body;
  if (type == 'is_active') {
    const Data = await rentCatSch.updateMany({ _id: { $in: rent_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentCatSch.updateMany(
      { _id: { $in: rent_category_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

rentController.getTrendingRent = async (req, res, next) => {
  try {
    const trendRentId = await rentViewCountSch.aggregate([
      {
        $match: {
          date: { $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: '$rent_post_id',
          sum: { $sum: '$count' },
        },
      },
      { $sort: { sum: -1 } },
      { $limit: 7 },
    ]);
    let ids = [];
    for (let i = 0; i < trendRentId.length; i++) {
      ids = trendRentId[i]._id;
    }
    const current_date = new Date();
    const data = await rentSch
      .find({ is_active: true, is_deleted: false, is_published: true, _id: { $in: trendRentId }, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name',
        },
        {
          path: 'image',
          select: 'path',
        },
        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(6);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Trending rent post get success!', null);
  } catch (err) {
    next(err);
  }
};

rentController.getLatestRentByCat = async (req, res, next) => {
  try {
    const size_default = 10;
    let size;
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    const cat_id = req.params.cat_id;
    const category = await rentCatSch.findById(cat_id).select({ title: 1, slug_url: 1 });
    const current_date = new Date();
    const rents = await rentSch
      .find({ is_active: true, is_deleted: false, category: cat_id, is_published: true, published_on: { $lte: current_date } })
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name',
        },

        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1 })
      .sort({ _id: -1 })
      .skip(0)
      .limit(size * 1);
    const totalData = rents.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { rents, category, totalData }, null, 'Latest rent posts by category', null);
  } catch (err) {
    next(err);
  }
};
rentController.getRelatedRent = async (req, res, next) => {
  try {
    const slug = req.params.slug_url;
    const current_date = new Date();
    let filter = { is_deleted: false, is_active: true, is_published: true, published_on: { $lte: current_date } };
    let slug_filter = { slug_url: slug };
    let slug_not_filter = { slug_url: { $ne: slug } };
    if (objectId.isValid(slug)) {
      filter._id = slug;
      slug_filter = { _id: slug };
      slug_not_filter = { _id: { $ne: objectId(slug) } };
    } else {
      filter.slug_url = slug;
    }
    const tages = await rentSch.findOne(filter).select('tags meta_tag category keywords');

    let f = [];
    if (tages) {
      let d = [''];
      d = [...tages?.meta_tag, ...tages?.keywords, ...tages?.tags];
      for (let i = 0; i < d.length; i++) {
        f.push({ tags: d[i] });
      }
    }
    let filter_final = {
      is_active: true,
      is_deleted: false,
      is_published: true,
      published_on: { $lte: current_date },
      ...slug_not_filter,
    };
    if (f && f.length) {
      filter_final = { ...filter_final, $or: f };
    } else if (tages && tages.category) {
      filter_final = { ...filter_final, $or: [{ category: tages.category }] };
    }
    const data = await rentSch
      .find(filter_final)
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name',
        },

        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1 })
      .sort({ published_on: -1 })
      .skip(0)
      .limit(3);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rent post', null);
  } catch (err) {
    next(err);
  }
};

rentController.getRentArchives = async (req, res, next) => {
  try {
    const current_date = new Date();
    const rentArchives = await rentSch
      .populate([
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'posted_by',
          select: '_id name',
        },

        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ])
      .select({ slug_url: 1, title: 1, added_at: 1, image: 1, short_description: 1, description: 1, posted_by: 1, category: 1, sub_category: 1, likes: 1 })
      .sort({ published_on: 1 })
      .skip(0)
      .limit(10);
    const month = [];
    const months = rentArchives.map((each) => {
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

rentController.getRentNonAuthorize = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 12, false);

    populate = [
      {
        path: 'posted_by',
        select: '_id name',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ];
    selectQuery = 'title description likes location map_iframe price frequency situated_floor near_by_places is_available amenities category sub_category posted_by short_description meta_tag meta-description keywords slug_url is_published published_on is_active image added_by added_at updated_at updated_by is_highlight is_showcase';
    searchQuery = {
      posted_by: req.user.id,
      is_published: true,
      is_active: true,
      ...searchQuery,
    };
    if (req.query.find_title) {
      searchQuery = {
        title: {
          $regex: req.query.find_title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req.query.find_published_on) {
      searchQuery = {
        published_on: {
          $regex: req.query.find_published_on,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    let rents = await otherHelper.getQuerySendResponse(rentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rents.data, rentConfig.get, page, size, rents.totalData);
  } catch (err) {
    next(err);
  }
};

rentController.getHighlightRent = async (req, res, next) => {
  try {
    const current_date = new Date();
    const searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      is_highlight: true,
      published_on: { $lte: current_date },
    };
    const highlight_rent = await rentSch.find(searchQuery).populate([
      { path: 'category', select: 'title _id' },
      { path: 'sub_category', select: 'title _id' },
      { path: 'posted_by', select: 'name _id image' },
      { path: 'added_by', select: 'name _id image' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, highlight_rent, null, 'highlighted rent  get successfully', null);
  } catch (err) {
    next(err);
  }
};

rentController.getRentUnauthorize = async (req, res, next) => {
  try {
    const size_default = 12;
    let page;
    let size;
    let sortQuery = '-published_on';
    let populate;
    let searchQuery;
    let selectQuery;
    if (req.query.page && !isNaN(req.query.page) && req.query.page != 0) {
      page = Math.abs(req.query.page);
    } else {
      page = 1;
    }
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    if (req.query.sort) {
      let sortfield = req.query.sort.slice(1);
      let sortby = req.query.sort.charAt(0);
      if (sortby == 1 && !isNaN(sortby) && sortfield) {
        //one is ascending
        sortQuery = sortfield;
      } else if (sortby == 0 && !isNaN(sortby) && sortfield) {
        //zero is descending
        sortQuery = '-' + sortfield;
      } else {
        sortQuery = '';
      }
    }
    populate = [
      {
        path: 'posted_by',
        select: '_id name image',
      },
      {
        path: 'added_by',
        select: '_id name image',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },

      { path: 'likes' },
    ];
    selectQuery = 'title description main_image  likes location map_iframe price frequency situated_floor near_by_places is_available amenities category sub_category posted_by short_description meta_tag meta-description keywords slug_url is_published published_on is_active image added_by added_at updated_at updated_by is_highlight is_showcase';
    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      published_on: { $lte: current_date },
    };

    if (req?.query?.title) {
      searchQuery = {
        title: {
          $regex: req.query.title,
          $options: 'i',
        },
        ...searchQuery,
      };
    }
    if (req?.query?.published_on) {
      searchQuery = {
        published_on: req.query.published_on,
        ...searchQuery,
      };
    }
    if (req.query?.category) {
      searchQuery = {
        category: req.query.category,
        ...searchQuery,
      };
    }
    if (req?.query?.sub_category) {
      searchQuery = {
        sub_category: req.query.sub_category,
        ...searchQuery,
      };
    }

    if (req?.query?.min_price) {
      searchQuery = {
        price: { $gte: Number(req.query.min_price), $lte: Number(req.query.max_price) },
        ...searchQuery,
      };
    }

    let rents = await otherHelper.getQuerySendResponse(rentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rents.data, rentConfig.get, page, size, rents.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentCategory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description  image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { ...searchQuery, is_active: true };

    if (req.query.title || req.query.size || req.query.is_active || req.query.page) {
      delete searchQuery.is_active;
      if (req.query.title) {
        searchQuery = {
          title: {
            $regex: req.query.title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.is_active) {
        searchQuery = { is_active: true, ...searchQuery };
      }
    }
    populate = [{ path: 'sub_category' }];
    let rentCategories = await otherHelper.getQuerySendResponse(rentCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentCategories.data, rentConfig?.cget, page, size, rentCategories.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentSubCategory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description  image is_active added_by added_at updated_at updated_by is_deleted category';
    searchQuery = { ...searchQuery, is_active: true };

    if (req.query.title || req.query.size || req.query.is_active || req.query.page) {
      delete searchQuery.is_active;
      if (req.query.title) {
        searchQuery = {
          title: {
            $regex: req.query.title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.is_active) {
        searchQuery = { is_active: true, ...searchQuery };
      }
    }
    populate = [{ path: 'category' }];
    let rentSubCategories = await otherHelper.getQuerySendResponse(rentSubCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentSubCategories.data, rentConfig?.cget, page, size, rentSubCategories.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rentCats = await rentSch.findOne({ _id: id }).populate([{ path: 'sub_category' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, rentCats, null, rentConfig.cget, null);
  } catch (err) {
    next(err);
  }
};

rentController.SaveRent = async (req, res, next) => {
  req.body.added_by = req.user.id;
  req.body.posted_by = req.user.id;
  req.body.published_on = new Date();

  console.log(req.body);
  if (!req.body.sub_category) {
    delete req.body.sub_category;
  }
  try {
    const newRent = new rentSch(req.body);
    const rentSave = await newRent.save();
    return otherHelper.sendResponse(res, httpStatus.OK, true, rentSave, null, rentConfig.save, null);
  } catch (err) {
    next(err);
  }
};
rentController.SaveRentAdmin = async (req, res, next) => {
  if (req.files) {
    if (req.files.main_image) req.body.main_image = req.files.main_image[0];
    if (req.files.images.length > 0) req.body.images = req.files.images;
  }
  try {
    let rents = req.body;
    if (rents.title) {
      const slug = urlSlug.convert(rents.title, {
        separator: '_',
        transformer: urlSlug.LOWERCASE_TRANSFORMER,
      });
      rents.slug_url = slug;
    }

    if (!rents.is_highlight) {
      rents.is_highlight = false;
    }
    if (!rents.is_published) {
      rents.is_published = false;
    }
    if (!rents.is_active) {
      rents.is_active = false;
    }
    if (!rents.is_showcase) {
      rents.is_showcase = false;
    }
    if (rents && rents._id) {
      if (!rents.meta_tag) rents.meta_tag = [];
      if (!rents.category) rents.category = '';
      if (!rents.tags) rents.tags = [];
      if (!rents.keywords) rents.keywords = [];
      if (!rents.amenities) rents.amenities = [];
      if (!rents.location) rents.location = {};
      if (!rents.posted_by) rents.posted_by = req.user._id;

      console.log();
      rents = { _id: rents._id, title: rents.title, published_on: rents.published_on, is_active: rents.is_active, is_published: rents.is_published, is_highlight: rents.is_highlight, is_showcase: rents.is_showcase };
      const update = await rentSch.findByIdAndUpdate(
        rents._id,
        {
          $set: rents,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentConfig.save, null);
    } else {
      rents.added_by = req.user.id;
      rents.posted_by = req.user.id;
      rents.published_on = new Date();
      const newRent = new rentSch(rents);
      const rentSave = await newRent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, rentSave, null, rentConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
rentController.saveRentCategory = async (req, res, next) => {
  try {
    let rentCats = req.body;
    if (rentCats && rentCats._id) {
      rentCats.updated_at = new Date();
      rentCats.updated_by = req.user.id;
      const update = await rentCatSch.findByIdAndUpdate(
        rentCats._id,
        {
          $set: rentCats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentConfig.categoryUpdate, null);
    } else {
      const newRent = new rentCatSch(rentCats);
      const catSave = await newRent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, rentConfig.categorySave, null);
    }
  } catch (err) {
    next(err);
  }
};
rentController.saveRentSubCategory = async (req, res, next) => {
  try {
    let rentSubCats = req.body;
    if (rentSubCats && rentSubCats._id) {
      rentSubCats.updated_at = new Date();
      rentSubCats.updated_by = req.user.id;
      const update = await rentSubCatSch.findByIdAndUpdate(
        rentSubCats._id,
        {
          $set: rentSubCats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentConfig.categoryUpdate, null);
    } else {
      const newRent = new rentSubCatSch(rentSubCats);
      const catSave = await newRent.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, rentConfig.categorySave, null);
    }
  } catch (err) {
    next(err);
  }
};
rentController.getRentDetail = async (req, res, next) => {
  const id = req.params.id;
  const populate = [];
  const rent = await rentSch
    .findOne({
      _id: id,
      is_deleted: false,
    })
    .populate(populate);
  return otherHelper.sendResponse(res, httpStatus.OK, true, rent, null, rentConfig.get, null);
};
rentController.getRentBySlug = async (req, res, next) => {
  const slug = req.params.slug_url;
  const current_date = new Date();
  let filter = { is_deleted: false, is_published: true, published_on: { $lte: current_date } };
  if (objectId.isValid(slug)) {
    filter._id = slug;
  } else {
    filter.slug_url = slug;
  }
  const rents = await rentSch
    .findOne(filter, {
      is_published: 0,
    })
    .populate([
      {
        path: 'posted_by',
        select: '_id name image',
      },
      {
        path: 'added_by',
        select: '_id name image',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ]);
  if (!rents) {
    return otherHelper.sendResponse(res, httpStatus.OK, false, rents, 'no rent post found', 'no rent post found', null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, rents, null, rentConfig.get, null);
};

rentController.getRentById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rents = await rentSch
      .findOne({
        _id: id,
        is_deleted: false,
      })
      .populate([
        {
          path: 'posted_by',
          select: '_id name',
        },
        {
          path: 'likes',
          select: '_id name',
        },
        {
          path: 'saves',
          select: '_id name',
        },
        {
          path: 'category',
          select: '_id title',
        },
        {
          path: 'sub_category',
          select: '_id title',
        },
      ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, rents, null, rentConfig.get, null);
  } catch (err) {
    next(err);
  }
};

rentController.getRentByCat = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    const slug = req.params.slug_url;
    const current_date = new Date();
    const cat = await rentCatSch.findOne({ slug_url: slug, is_deleted: false }, { _id: 1, title: 1 });
    let rents = { data: [], totalData: 0 };
    if (cat && cat._id) {
      populate = [
        {
          path: 'category',
          select: 'title slug_url',
        },
        {
          path: 'posted_by',
          select: 'name',
        },
      ];
      selectQuery = 'title description likes location map_iframe price frequency situated_floor near_by_places is_available amenities tags posted_by short_description meta_tag meta-description category keywords slug_url published_on is_active image added_by added_at updated_at updated_by';
      searchQuery = {
        is_published: true,
        is_active: true,
        published_on: { $lte: current_date },
        category: cat && cat._id,
        ...searchQuery,
      };
      if (req.query.find_title) {
        searchQuery = {
          title: {
            $regex: req.query.find_title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.find_published_on) {
        searchQuery = {
          published_on: {
            $regex: req.query.find_published_on,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      rents = await otherHelper.getQuerySendResponse(rentSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rents.data, (cat && cat.title) || 'Category', page, size, rents.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentByTag = async (req, res, next) => {
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

    const tag = req.params.tag;
    populateq = [
      {
        path: 'posted_by',
        select: '_id name',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ];
    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      tags: tag,
      published_on: { $lte: current_date },
    };
    const tagRent = await otherHelper.getQuerySendResponse(rentSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagRent.data, rentConfig.get, page, size, tagRent.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentByCreator = async (req, res, next) => {
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

    const postedById = req.params.postedById;
    populateq = [
      {
        path: 'posted_by',
        select: '_id name',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ];
    const current_date = new Date();
    searchQuery = { is_deleted: false, is_active: true, posted_by: postedById, is_published: true, published_on: { $lte: current_date } };
    const rentedBy = await otherHelper.getQuerySendResponse(rentSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentedBy.data, 'rents by creator get success!', page, size, rentedBy.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentByDate = async (req, res, next) => {
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
      is_active: true,
      is_published: true,
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
        path: 'posted_by',
        select: '_id name',
      },
      {
        path: 'likes',
        select: '_id name',
      },
      {
        path: 'saves',
        select: '_id name',
      },
      {
        path: 'category',
        select: '_id title',
      },
      {
        path: 'sub_category',
        select: '_id title',
      },
    ];

    const tagRent = await otherHelper.getQuerySendResponse(rentSch, page, size, '', searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagRent.data, rentConfig.get, page, size, tagRent.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.deleteRent = async (req, res, next) => {
  const id = req.params.id;
  const rent = await rentSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rent, null, rentConfig.delete, null);
};
rentController.deleteRentCat = async (req, res, next) => {
  const id = req.params.id;
  const rentCat = await rentCatSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  await rentSch.updateMany({ category: id }, { $set: { is_deleted: true } });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentCat, null, rentConfig.deleteCat, null);
};

rentController.countRentByCat = async (req, res, next) => {
  const id = req.params.id;
  const rentCount = await rentSch.countDocuments({ category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentCount, null, 'rent post count by category', null);
};
rentController.countRentBySubCat = async (req, res, next) => {
  const id = req.params.id;
  const rentCount = await rentSch.countDocuments({ sub_category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentCount, null, 'rent post count by subcategory', null);
};

rentController.updateViewCount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const date_only = moment().format('YYYY-MM-DD');
    let d = await rentViewCountSch.findOneAndUpdate({ rent_id: id, date: date_only }, { $inc: { count: 1 } });
    if (!d) {
      const newRentCount = new rentViewCountSch({ rent_id: id, date: date_only, count: 1 });
      d = await newRentCount.save();
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, null, null);
  } catch (err) {
    next(err);
  }
};
rentController.updateLikeCount = async (req, res, next) => {
  try {
    const post = await rentSch.findById(req.params.id);
    if (!post) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Rent Post not found!', null);
    }
    if (post.likes.includes(req.user.id)) {
      const index = post.likes.indexOf(req.user.id);
      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post Unliked',
      });
    } else {
      post.likes.push(req.user.id);
      await post.save();
      return res.status(200).json({
        success: true,
        message: 'Post Liked',
      });
    }
  } catch (err) {
    next(err);
  }
};

exports.saveUnsavePost = async (req, res, next) => {
  try {
    const post = await rentSch.findById(req.params.id);
    if (!post) {
      return otherHelper.sendResponse(res, httpStatus.NOT_FOUND, false, null, null, 'Rent Post not found!', null);
    }
    if (post.saves.includes(req.user._id)) {
      const index = post.saves.indexOf(req.user._id);

      post.saves.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post Unsaved',
      });
    } else {
      post.saves.push(req.user._id);

      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post Saved',
      });
    }
  } catch (err) {
    next(err);
  }
};

rentController.getRentCategoryActive = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = '_id title slug_url description image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { is_active: true, ...searchQuery };
    let rentCategories = await otherHelper.getQuerySendResponse(rentCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentCategories.data, rentConfig.get, page, size, rentCategories.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.getRentSubCategoryActive = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    populate = [
      {
        path: 'category',
        select: '_id title slug_url',
      },
    ];
    selectQuery = '_id title slug_url description category image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { is_active: true, ...searchQuery };
    let rentCategories = await otherHelper.getQuerySendResponse(rentSubCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentCategories.data, rentConfig.get, page, size, rentCategories.totalData);
  } catch (err) {
    next(err);
  }
};
rentController.selectMultipleDataRent = async (req, res, next) => {
  const { rent_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await rentSch.updateMany({ _id: { $in: rent_id } }, [
      {
        $set: {
          is_published: { $not: '$is_published' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else if (type == 'is_active') {
    const Data = await rentSch.updateMany({ _id: { $in: rent_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentSch.updateMany(
      { _id: { $in: rent_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

rentController.selectMultipleDataCat = async (req, res, next) => {
  const { rent_category_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await rentCatSch.updateMany({ _id: { $in: rent_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentCatSch.updateMany(
      { _id: { $in: rent_category_id } },
      {
        $set: {
          is_deleted: true,
          deleted_at: new Date(),
        },
      },
    );
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Multiple Data Delete Success', null);
  }
};

rentController.countAllRentByCat = async (req, res, next) => {
  // Use the aggregate pipeline to retrieve the title, _id, and count of blogs for each category

  rentSch
    .aggregate([
      {
        $lookup: {
          from: 'rentpostcats', // The name of the 'rentPostCats' collection in MongoDB
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      // {
      //   $unwind: '$category',
      // },
      {
        $group: {
          _id: '$category._id',
          title: { $first: '$category.title' },
          count: { $sum: 1 },
        },
      },
    ])
    .then((results) => {
      data = results.map((item) => {
        return { ...item, _id: item._id[0], title: item.title[0] };
      });

      return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Get count by category success', null);
    })

    .catch((error) => {
      console.error(error);
    });
};

rentController.getMyRents = async (req, res, next) => {
  try {
    const current_date = new Date();
    const searchQuery = {
      // posted_by: req.user.id || req.user._id,
      added_by: req.user.id || req.user._id,
      is_deleted: false,
      // is_active: true,
      // is_published: true,
      published_on: { $lte: current_date },
    };
    const highlight_rent = await rentSch.find(searchQuery).populate([
      { path: 'category', select: 'title _id' },
      { path: 'sub_category', select: 'title _id' },
      { path: 'posted_by', select: 'name _id image' },
      { path: 'added_by', select: 'name _id image' },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, highlight_rent, null, 'my rent post get successfully', null);
  } catch (err) {
    next(err);
  }
};

rentController.getLikedRents = async (req, res, next) => {
  try {
    const current_date = new Date();
    const likedPosts = await rentSch.find({ likes: { $in: [req.user.id] } });
    const searchQuery = {
      likes: { $in: [req.user.id] },
      is_deleted: false,
      is_active: true,
      is_published: true,
      published_on: { $lte: current_date },
    };
    const rent = await rentSch.find(searchQuery).populate([
      { path: 'category', select: 'title _id' },
      { path: 'sub_category', select: 'title _id' },
      { path: 'posted_by', select: 'name _id image' },
      { path: 'added_by', select: 'name _id image' },
      { path: 'likes', select: 'name _id image' },
    ]);

    return otherHelper.sendResponse(res, httpStatus.OK, true, rent, null, 'my rent post get successfully', null);
  } catch (err) {
    next(err);
  }
};
module.exports = rentController;
