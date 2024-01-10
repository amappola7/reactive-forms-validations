import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = [
    {fullName: 'John Doe', email: 'john@example.com', password: 'password1'},
    {fullName: 'Jane Doe', email: 'jane@example.com', password: 'password2'}
  ];

  constructor() { }

  isEmailUnique(email: string): boolean {
    return !this.users.some(user => user.email === email);
  }

  addUser(user: any): void {
    this.users.push(user);
  }

  getUsers(): any[] {
    return this.users;
  }
}
