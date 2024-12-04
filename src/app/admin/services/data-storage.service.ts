import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OmfoItem } from '../../shared/modals';
import { ENV } from '../../../env/env';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  private BASE_URL = ENV.DS_URL;

  constructor(private http: HttpClient, private router: Router) {}

  public storeItem(item: OmfoItem) {
    return this.http.post(`${this.BASE_URL}.json`, JSON.stringify(item));
  }

  public fetchItems() {
    return this.http.get(`${this.BASE_URL}.json`);
  }

  public updateItem(id: string, item: OmfoItem) {
    return this.http.put(`${this.BASE_URL}/${id}.json`, JSON.stringify(item));
  }

  public deleteItem(id: string) {
    return this.http.delete(`${this.BASE_URL}/${id}.json`);
  }
}
