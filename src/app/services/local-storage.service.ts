import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setItem(key: string, value: any): void {
   localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<User>(key: string): User | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as User) : null;
  }

  getUserId(key: string): number | null {
    const data = localStorage.getItem(key);
    return data ? (JSON.parse(data) as number) : null;
  }
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
