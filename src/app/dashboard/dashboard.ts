import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Item } from '../item.model';
import * as ItemActions from '../store/actions/item.actions';
import { selectAllItems } from '../store/selectors/item.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class Dashboard {
  items$: any;
  itemForm: FormGroup;
  editMode = false;
  currentItemId: number | null = null;

  constructor(private store: Store, private fb: FormBuilder) {
    this.items$ = this.store.select(selectAllItems);
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.itemForm.invalid) { return; }
    const { name, description } = this.itemForm.value;
    if (this.editMode && this.currentItemId !== null) {
      this.store.dispatch(ItemActions.updateItem({ item: { id: this.currentItemId, name, description } }));
    } else {
      const id = Date.now();
      this.store.dispatch(ItemActions.addItem({ item: { id, name, description } }));
    }
    this.itemForm.reset();
    this.editMode = false;
    this.currentItemId = null;
  }

  onEdit(item: Item) {
    this.editMode = true;
    this.currentItemId = item.id;
    this.itemForm.patchValue({ name: item.name, description: item.description });
  }

  onDelete(id: number) {
    this.store.dispatch(ItemActions.deleteItem({ id }));
  }
}
