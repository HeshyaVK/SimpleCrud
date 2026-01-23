import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Item } from '../../models/item';
import { ItemService } from '../../services/item.service';

@Component({
    selector: 'app-items',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './items.component.html',
    styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit {
    private itemService = inject(ItemService);
    items: Item[] = [];
    currentItem: Item = { id: 0, name: '', description: '' };
    isEditing = false;

    ngOnInit(): void {
        this.loadItems();
    }

    loadItems() {
        this.itemService.getItems().subscribe(data => this.items = data);
    }

    onSubmit() {
        if (this.isEditing) {
            this.itemService.updateItem(this.currentItem.id, this.currentItem).subscribe(() => {
                this.loadItems();
                this.resetForm();
            });
        } else {
            this.itemService.createItem(this.currentItem).subscribe(() => {
                this.loadItems();
                this.resetForm();
            });
        }
    }

    editItem(item: Item) {
        this.currentItem = { ...item };
        this.isEditing = true;
    }

    deleteItem(id: number) {
        if (confirm('Are you sure?')) {
            this.itemService.deleteItem(id).subscribe(() => this.loadItems());
        }
    }

    resetForm() {
        this.currentItem = { id: 0, name: '', description: '' };
        this.isEditing = false;
    }
}
