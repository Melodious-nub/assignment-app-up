import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: false,

  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  userForm!: FormGroup;
  users: any[] = [];
  filteredUsers: any[] = [];
  filterStatus: string = 'all';
  isEdit: boolean = false;
  currentUserIndex: number | null = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // Initialize form with validation
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      status: ['active', Validators.required]
    });

    // Load users from localStorage
    this.loadUsers();
  }

  // Load users from localStorage
  loadUsers() {
    const storedUsers = localStorage.getItem('users');
    this.users = storedUsers ? JSON.parse(storedUsers) : [];
    this.filteredUsers = [...this.users];
  }

  // Apply filter to the list based on status
  applyFilter() {
    if (this.filterStatus === 'all') {
      this.filteredUsers = [...this.users];
    } else {
      this.filteredUsers = this.users.filter(user => user.status === this.filterStatus);
    }
  }

  // Open the add modal
  openAddModal() {
    this.isEdit = false;
    this.userForm.reset({ status: 'active' });
    this.currentUserIndex = null;
  }

  // Open the edit modal with existing data
  openEditModal(user: any) {
    this.isEdit = true;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      status: user.status
    });
    this.currentUserIndex = this.users.indexOf(user);
  }

  // Save or update the user
  saveUser() {
    if (this.userForm.invalid) return;

    const user = this.userForm.value;

    if (this.isEdit && this.currentUserIndex !== null) {
      // Update existing user
      this.users[this.currentUserIndex] = user;
    } else {
      // Add new user
      this.users.push(user);
    }

    // Save users to localStorage
    localStorage.setItem('users', JSON.stringify(this.users));

    // Reload users
    this.loadUsers();
  }

  // Get form control for easier access in the template
  get formControls() {
    return this.userForm.controls;
  }

}
