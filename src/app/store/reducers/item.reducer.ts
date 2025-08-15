import { createReducer, on } from '@ngrx/store';
import * as ItemActions from '../actions/item.actions';
import { Item } from '../../item.model';

export interface ItemState {
  items: Item[];
}

export const initialState: ItemState = {
  items: []
};

export const itemReducer = createReducer(
  initialState,
  on(ItemActions.loadItemsSuccess, (state, { items }) => ({ ...state, items })),
  on(ItemActions.addItem, (state, { item }) => ({ ...state, items: [...state.items, item] })),
  on(ItemActions.updateItem, (state, { item }) => ({
    ...state,
    items: state.items.map(i => i.id === item.id ? item : i)
  })),
  on(ItemActions.deleteItem, (state, { id }) => ({
    ...state,
    items: state.items.filter(i => i.id !== id)
  }))
);
