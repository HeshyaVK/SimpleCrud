import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:2211/api/items';

    getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.apiUrl);
    }

    getItem(id: number): Observable<Item> {
        return this.http.get<Item>(`${this.apiUrl}/${id}`);
    }

    createItem(item: Item): Observable<Item> {
        return this.http.post<Item>(this.apiUrl, item);
    }

    updateItem(id: number, item: Item): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, item);
    }

    deleteItem(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
