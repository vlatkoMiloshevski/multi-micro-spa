
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CoverStateModel } from './cover-state.model';

const getCoverFeatureState = createFeatureSelector<CoverStateModel>('covers');

export const getShowLargeImages = createSelector(
    getCoverFeatureState,
    state => state.showLargeImages
)

export const getCover = createSelector(
    getCoverFeatureState,
    state => state.cover
)
