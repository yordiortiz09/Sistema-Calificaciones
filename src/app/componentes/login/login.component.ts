import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedServiceService } from '../../services/shared-service.service';
import { User } from '../../interfaces/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup;
  constructor(private fb: FormBuilder,
    private authService: AuthService,

    private router: Router,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedServiceService,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

  }
  get password() { return this.form.get('password') as FormControl }
  get email() { return this.form.get('email') as FormControl }

  onSubmit(values: User) {
    this.authService.login(values).subscribe((response: any) => {

      localStorage.setItem('token', response.token);
      localStorage.setItem('id', response.user.id);
      localStorage.setItem('rol_id', response.user.rol_id);

      if (response.user.rol_id === 1) {
        this.sharedService.setId(response.user.rol_id);
        this.changeDetectorRef.detectChanges();
        this.router.navigate(['/grupo/' + response.user.id + '']);
      }
      else if (response.user.rol_id === 2) {
        this.router.navigate(['/materia/' + response.user.id + '']);
        this.sharedService.setId(response.user.rol_id);
        this.changeDetectorRef.detectChanges();
      }

    },
      error => {
        console.log(error);
      });
  }





}
