import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    LoadingSpinnerComponent,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isLoading = false;

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.autoLogin();
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    console.log('LOG IN');
    console.log(email);
    console.log(password);

    this.isLoading = true;
    this.error = null;

    this.authService.login(email, password).subscribe({
      next: (resData) => {
        console.log(1);
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      error: (errorMessage) => {
        console.log(2);
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      },
      complete: () => {
        console.log('.');
        console.log('....');
      },
    });

    form.reset();
  }
}
