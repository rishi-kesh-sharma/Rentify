import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the RentSubCategory state domain
 */

const selectRentSubCategoryDomain = (state) =>
  state.RentSubCategory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RentSubCategory
 */

export const makeSelectAll = () =>
  createSelector(selectRentSubCategoryDomain, (substate) => substate.all);

export const makeSelectCategory = () =>
  createSelector(selectRentSubCategoryDomain, (state) => state.category);
export const makeSelectCount = () =>
  createSelector(selectRentSubCategoryDomain, (substate) => substate.count);

export const makeSelectErrors = () =>
  createSelector(selectRentSubCategoryDomain, (state) => state.errors);
export const makeSelectQuery = () =>
  createSelector(selectRentSubCategoryDomain, (substate) => substate.query);
export const makeSelectOne = () =>
  createSelector(selectRentSubCategoryDomain, (substate) => substate.one);
export const makeSelectLoading = () =>
  createSelector(selectRentSubCategoryDomain, (state) => state.loading);
