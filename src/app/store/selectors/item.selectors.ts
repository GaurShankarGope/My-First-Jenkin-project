import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ItemState } from '../reducers/item.reducer';

export const selectItemState = createFeatureSelector<ItemState>('item');
export const selectAllItems = createSelector(selectItemState, state => state.items);
