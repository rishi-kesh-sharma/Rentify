import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the RentCategory state domain
 */

const selectRentCategoryDomain = (state) => state.RentCategory || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by RentCategory
 */

export const makeSelectAll = () =>
  createSelector(selectRentCategoryDomain, (substate) => substate.all);

export const makeSelectCount = () =>
  createSelector(selectRentCategoryDomain, (substate) => substate.count);

export const makeSelectErrors = () =>
  createSelector(selectRentCategoryDomain, (state) => state.errors);
export const makeSelectQuery = () =>
  createSelector(selectRentCategoryDomain, (substate) => substate.query);
export const makeSelectOne = () =>
  createSelector(selectRentCategoryDomain, (substate) => substate.one);
export const makeSelectLoading = () =>
  createSelector(selectRentCategoryDomain, (state) => state.loading);
