const httpStatus = require('http-status');
const otherHelper = require('../../helper/others.helper');
const rentPostConfig = require('./rentPostConfig');
const rentPostSch = require('./rentPostSchema');
const userSch = require('../user/userSchema');
const rentPostViewCountSch = require('./rentPostViewCountSchema');
const rentPostCatSch = require('./categorySchema.js');
const rentPostSubCatSch = require('./subCategorySchema');
const moment = require('moment');
const rentPostController = {};
const objectId = require('mongoose').Types.ObjectId;
rentPostController.getRentPostAuthorize = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
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
    let rentPosts = await otherHelper.getQuerySendResponse(rentPostSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    let published = await rentPostSch.countDocuments({ is_published: true, is_deleted: false });
    let active = await rentPostSch.countDocuments({ is_active: true, is_deleted: false });
    let highlight = await rentPostSch.countDocuments({ is_highlight: true, is_deleted: false });
    let showcase = await rentPostSch.countDocuments({ is_showcase: true, is_deleted: false });
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPosts.data, { published, active, highlight, showcase }, page, size, rentPosts.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.getLatestRentPost = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await rentPostSch
      .find({ is_active: true, is_deleted: false, is_published: true, published_on: { $lte: current_date } })
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
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rent post get success!', null);
  } catch (err) {
    next(err);
  }
};
rentPostController.getShowcaseRentPost = async (req, res, next) => {
  try {
    const current_date = new Date();
    const data = await rentPostSch
      .find({ is_active: true, is_deleted: false, is_published: true, is_showcase: true, published_on: { $lte: current_date } })
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
      .limit(5);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rentPost get success!', null);
  } catch (err) {
    next(err);
  }
};

rentPostController.selectMultipleDataRentPost = async (req, res, next) => {
  const { rentPost_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await rentPostSch.updateMany({ _id: { $in: rentPost_id } }, [
      {
        $set: {
          is_published: { $not: '$is_published' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else if (type == 'is_active') {
    const Data = await rentPostSch.updateMany({ _id: { $in: rentPost_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentPostSch.updateMany(
      { _id: { $in: rentPost_id } },
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

rentPostController.selectMultipleDataCat = async (req, res, next) => {
  const { rentPost_category_id, type } = req.body;
  if (type == 'is_active') {
    const Data = await rentPostCatSch.updateMany({ _id: { $in: rentPost_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentPostCatSch.updateMany(
      { _id: { $in: rentPost_category_id } },
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

rentPostController.getTrendingRentPost = async (req, res, next) => {
  try {
    const trendRentPostId = await rentPostViewCountSch.aggregate([
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
    for (let i = 0; i < trendRentPostId.length; i++) {
      ids = trendRentPostId[i]._id;
    }
    const current_date = new Date();
    const data = await rentPostSch
      .find({ is_active: true, is_deleted: false, is_published: true, _id: { $in: trendRentPostId }, published_on: { $lte: current_date } })
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

rentPostController.getLatestRentPostByCat = async (req, res, next) => {
  try {
    const size_default = 10;
    let size;
    if (req.query.size && !isNaN(req.query.size) && req.query.size != 0) {
      size = Math.abs(req.query.size);
    } else {
      size = size_default;
    }
    const cat_id = req.params.cat_id;
    const category = await rentPostCatSch.findById(cat_id).select({ title: 1, slug_url: 1 });
    const current_date = new Date();
    const rentPosts = await rentPostSch
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
      .sort({ _id: -1 })
      .skip(0)
      .limit(size * 1);
    const totalData = rentPosts.length;
    return otherHelper.sendResponse(res, httpStatus.OK, true, { rentPosts, category, totalData }, null, 'Latest rent posts by category', null);
  } catch (err) {
    next(err);
  }
};
rentPostController.getRelatedRentPost = async (req, res, next) => {
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
    const tages = await rentPostSch.findOne(filter).select('tags meta_tag category keywords');

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
    const data = await rentPostSch
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
      .limit(3);
    return otherHelper.sendResponse(res, httpStatus.OK, true, data, null, 'Latest rent post', null);
  } catch (err) {
    next(err);
  }
};

rentPostController.getRentPostArchives = async (req, res, next) => {
  try {
    const current_date = new Date();
    const rentPostArchives = await rentPostSch
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
      .sort({ published_on: 1 })
      .skip(0)
      .limit(10);
    const month = [];
    const months = rentPostArchives.map((each) => {
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

rentPostController.getRentPostNonAuthorize = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
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
    let rentPosts = await otherHelper.getQuerySendResponse(rentPostSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPosts.data, rentPostConfig.get, page, size, rentPosts.totalData);
  } catch (err) {
    next(err);
  }
};

rentPostController.getHighlightRentPost = async (req, res, next) => {
  try {
    const current_date = new Date();
    const searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      is_highlight: true,
      published_on: { $lte: current_date },
    };
    const highlight_rent_post = await rentPostSch.find(searchQuery).populate([{ path: 'image', select: 'path' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, highlight_rent_post, null, 'highlighted rent post get successfully', null);
  } catch (err) {
    next(err);
  }
};

rentPostController.getRentPostUnauthorize = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
      },
    ];
    selectQuery = 'title description likes location map_iframe price frequency situated_floor near_by_places is_available amenities category sub_category posted_by short_description meta_tag meta-description keywords slug_url is_published published_on is_active image added_by added_at updated_at updated_by is_highlight is_showcase';
    const current_date = new Date();
    searchQuery = {
      is_deleted: false,
      is_active: true,
      is_published: true,
      is_highlight: false,
      published_on: { $lte: current_date },
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
    let rentPosts = await otherHelper.getQuerySendResponse(rentPostSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPosts.data, rentPostConfig.get, page, size, rentPosts.totalData);
  } catch (err) {
    next(err);
  }
};

rentPostController.getRentPostCategory = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description  image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { ...searchQuery, is_active: true };

    if (req.query.find_title || req.query.size || req.query.is_active || req.query.page) {
      delete searchQuery.is_active;
      if (req.query.find_title) {
        searchQuery = {
          title: {
            $regex: req.query.find_title,
            $options: 'i',
          },
          ...searchQuery,
        };
      }
      if (req.query.is_active) {
        searchQuery = { is_active: true, ...searchQuery };
      }
    }
    populate = [
      {
        path: 'image',
        select: 'path',
      },
      { path: 'sub_category' },
    ];
    let rentPostCategories = await otherHelper.getQuerySendResponse(rentPostCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPostCategories.data, rentPostConfig.cget, page, size, rentPostCategories.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.getRentPostCatById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rentPostCats = await rentPostSch.findOne({ _id: id }).populate([{ path: 'image', select: 'path' }, { path: 'sub_category' }]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, rentPostCats, null, rentPostConfig.cget, null);
  } catch (err) {
    next(err);
  }
};
rentPostController.SaveRentPost = async (req, res, next) => {
  try {
    let rentPosts = req.body;
    if (rentPosts.is_highlight !== (true || false)) {
      rentPosts.is_highlight = false;
    }
    if (rentPosts.is_highlight == true) {
      await rentPostSch.updateMany({}, { $set: { is_highlight: false } }, { new: true });
      rentPosts.is_highlight === true;
    }
    if (rentPosts && rentPosts._id) {
      if (!rentPosts.meta_tag) rentPosts.meta_tag = [];
      if (!rentPosts.category) rentPosts.category = [];
      if (!rentPosts.tags) rentPosts.tags = [];
      if (!rentPosts.keywords) rentPosts.keywords = [];
      if (!rentPosts.posted_by) rentPosts.posted_by = req.user.id;

      const update = await rentPostSch.findByIdAndUpdate(
        rentPosts._id,
        {
          $set: rentPosts,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentPostConfig.save, null);
    } else {
      rentPosts.added_by = req.user.id;
      rentPosts.published_on = new Date();
      const newRentPost = new rentPostSch(rentPosts);
      const rentPostSave = await newRentPost.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, rentPostSave, null, rentPostConfig.save, null);
    }
  } catch (err) {
    next(err);
  }
};
rentPostController.saveRentPostCategory = async (req, res, next) => {
  try {
    let rentPostCats = req.body;
    if (rentPostCats && rentPostCats._id) {
      rentPostCats.updated_at = new Date();
      rentPostCats.updated_by = req.user.id;
      const update = await rentPostCatSch.findByIdAndUpdate(
        rentPostCats._id,
        {
          $set: rentPostCats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentPostConfig.categoryUpdate, null);
    } else {
      const newRentPost = new rentPostCatSch(rentPostCats);
      const catSave = await newRentPost.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, rentPostConfig.categorySave, null);
    }
  } catch (err) {
    next(err);
  }
};
rentPostController.saveRentPostSubCategory = async (req, res, next) => {
  try {
    let rentPostSubCats = req.body;
    if (rentPostSubCats && rentPostSubCats._id) {
      rentPostSubCats.updated_at = new Date();
      rentPostSubCats.updated_by = req.user.id;
      const update = await rentPostSubCatSch.findByIdAndUpdate(
        rentPostSubCats._id,
        {
          $set: rentPostSubCats,
        },
        { new: true },
      );
      return otherHelper.sendResponse(res, httpStatus.OK, true, update, null, rentPostConfig.categoryUpdate, null);
    } else {
      const newRentPost = new rentPostSubCatSch(rentPostSubCats);
      const catSave = await newRentPost.save();
      return otherHelper.sendResponse(res, httpStatus.OK, true, catSave, null, rentPostConfig.categorySave, null);
    }
  } catch (err) {
    next(err);
  }
};
rentPostController.getRentPostDetail = async (req, res, next) => {
  const id = req.params.id;
  const populate = [];
  const rentPost = await rentPostSch
    .findOne({
      _id: id,
      is_deleted: false,
    })
    .populate(populate);
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPost, null, rentPostConfig.get, null);
};
rentPostController.getRentPostBySlug = async (req, res, next) => {
  const slug = req.params.slug_url;
  const current_date = new Date();
  let filter = { is_deleted: false, is_published: true, published_on: { $lte: current_date } };
  if (objectId.isValid(slug)) {
    filter._id = slug;
  } else {
    filter.slug_url = slug;
  }
  const rentPosts = await rentPostSch
    .findOne(filter, {
      is_published: 0,
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
      {
        path: 'image',
        select: 'path',
      },
    ]);
  if (!rentPosts) {
    return otherHelper.sendResponse(res, httpStatus.OK, false, rentPosts, 'no rent post found', 'no rent post found', null);
  }
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPosts, null, rentPostConfig.get, null);
};

rentPostController.getRentPostById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const rentPosts = await rentPostSch
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
        {
          path: 'image',
          select: 'path',
        },
      ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, rentPosts, null, rentPostConfig.get, null);
  } catch (err) {
    next(err);
  }
};

rentPostController.getRentPostByCat = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    const slug = req.params.slug_url;
    const current_date = new Date();
    const cat = await rentPostCatSch.findOne({ slug_url: slug, is_deleted: false }, { _id: 1, title: 1 });
    let rentPosts = { data: [], totalData: 0 };
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
        {
          path: 'image',
          select: 'path',
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
      rentPosts = await otherHelper.getQuerySendResponse(rentPostSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    }
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPosts.data, (cat && cat.title) || 'Category', page, size, rentPosts.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.getRentPostByTag = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
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
    const tagRentPost = await otherHelper.getQuerySendResponse(rentPostSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagRentPost.data, rentPostConfig.get, page, size, tagRentPost.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.getRentPostByCreator = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
      },
    ];
    const current_date = new Date();
    searchQuery = { is_deleted: false, is_active: true, posted_by: postedById, is_published: true, published_on: { $lte: current_date } };
    const rentPostedBy = await otherHelper.getQuerySendResponse(rentPostSch, page, size, { published_on: -1 }, searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPostedBy.data, 'rents by creator get success!', page, size, rentPostedBy.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.getRentPostByDate = async (req, res, next) => {
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
      {
        path: 'image',
        select: 'path',
      },
    ];

    const tagRentPost = await otherHelper.getQuerySendResponse(rentPostSch, page, size, '', searchQuery, '', next, populateq);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, tagRentPost.data, rentPostConfig.get, page, size, tagRentPost.totalData);
  } catch (err) {
    next(err);
  }
};
rentPostController.deleteRentPost = async (req, res, next) => {
  const id = req.params.id;
  const rentPost = await rentPostSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPost, null, rentPostConfig.delete, null);
};
rentPostController.deleteRentPostCat = async (req, res, next) => {
  const id = req.params.id;
  const rentPostCat = await rentPostCatSch.findByIdAndUpdate(id, {
    $set: {
      is_deleted: true,
      deleted_at: new Date(),
    },
  });
  await rentPostSch.updateMany({ category: id }, { $set: { is_deleted: true } });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPostCat, null, rentPostConfig.deleteCat, null);
};

rentPostController.countRentPostByCat = async (req, res, next) => {
  const id = req.params.id;
  const rentPostCount = await rentPostSch.countDocuments({ category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPostCount, null, 'rent post count by category', null);
};
rentPostController.countRentPostBySubCat = async (req, res, next) => {
  const id = req.params.id;
  const rentPostCount = await rentPostSch.countDocuments({ sub_category: id, is_deleted: false });
  return otherHelper.sendResponse(res, httpStatus.OK, true, rentPostCount, null, 'rent post count by subcategory', null);
};
rentPostController.getStaticRentPost = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await (await rentPostSch.findOne({ _id: id }).select('title description image')).populated([{ path: 'image', select: 'path' }]);
    let newData = `<h1>${data.title}</h1><img srcConfig.image_base + data.image.path} /><p>${data.description}</p>`;
    return otherHelper.sendResponse(res, httpStatus.OK, true, newData, null, 'rent post get successful', null);
  } catch (err) {
    next(err);
  }
};

rentPostController.updateViewCount = async (req, res, next) => {
  try {
    const id = req.params.id;
    const date_only = moment().format('YYYY-MM-DD');
    let d = await rentPostViewCountSch.findOneAndUpdate({ rentPost_id: id, date: date_only }, { $inc: { count: 1 } });
    if (!d) {
      const newRentPostCount = new rentPostViewCountSch({ rentPost_id: id, date: date_only, count: 1 });
      d = await newRentPostCount.save();
    }
    return otherHelper.sendResponse(res, httpStatus.OK, true, null, null, null, null);
  } catch (err) {
    next(err);
  }
};
rentPostController.updateLikeCount = async (req, res, next) => {
  try {
    const post = await rentPostSch.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler('Post Not Found', 404));
    }
    if (post.likes.includes(req.user._id)) {
      const index = post.likes.indexOf(req.user._id);

      post.likes.splice(index, 1);
      await post.save();

      return res.status(200).json({
        success: true,
        message: 'Post Unliked',
      });
    } else {
      post.likes.push(req.user._id);

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
    const post = await rentPostSch.findById(req.params.id);
    if (!post) {
      return next(new ErrorHandler('Post Not Found', 404));
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

rentPostController.getRentPostCategoryActive = async (req, res, next) => {
  try {
    let { page, size, populate, selectQuery, searchQuery, sortQuery } = otherHelper.parseFilters(req, 10, false);
    selectQuery = 'title slug_url description  sub_category image is_active added_by added_at updated_at updated_by is_deleted';
    searchQuery = { is_active: true, ...searchQuery };
    let rentPostCategories = await otherHelper.getQuerySendResponse(rentPostCatSch, page, size, sortQuery, searchQuery, selectQuery, next, populate);
    return otherHelper.paginationSendResponse(res, httpStatus.OK, true, rentPostCategories.data, rentPostConfig.get, page, size, rentPostCategories.totalData);
  } catch (err) {
    next(err);
  }
};

rentPostController.selectMultipleDataRentPost = async (req, res, next) => {
  const { rentPost_id, type } = req.body;

  if (type == 'is_published') {
    const Data = await rentPostSch.updateMany({ _id: { $in: rentPost_id } }, [
      {
        $set: {
          is_published: { $not: '$is_published' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else if (type == 'is_active') {
    const Data = await rentPostSch.updateMany({ _id: { $in: rentPost_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentPostSch.updateMany(
      { _id: { $in: rentPost_id } },
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

rentPostController.selectMultipleDataCat = async (req, res, next) => {
  const { rentPost_category_id, type } = req.body;

  if (type == 'is_active') {
    const Data = await rentPostCatSch.updateMany({ _id: { $in: rentPost_category_id } }, [
      {
        $set: {
          is_active: { $not: '$is_active' },
        },
      },
    ]);
    return otherHelper.sendResponse(res, httpStatus.OK, true, Data, null, 'Status Change Success', null);
  } else {
    const Data = await rentPostCatSch.updateMany(
      { _id: { $in: rentPost_category_id } },
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

module.exports = rentPostController;
