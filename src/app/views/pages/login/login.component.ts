import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IconDirective } from '@coreui/icons-angular';
import {
  ButtonDirective,
  CardBodyComponent,
  CardComponent,
  CardGroupComponent,
  ColComponent,
  ContainerComponent,
  FormControlDirective,
  FormDirective,
  InputGroupComponent,
  InputGroupTextDirective,
  RowComponent
} from '@coreui/angular';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ContainerComponent, RowComponent, ColComponent, CardGroupComponent, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, IconDirective, FormControlDirective, ButtonDirective, RouterLink, FormsModule]
})
export class LoginComponent {
  username = '';
  password = '';

  readonly #authService = inject(AuthService);
  readonly #router = inject(Router);

  onSubmit(): void {
    const ok = this.#authService.login(this.username, this.password);
    if (ok) {
      void this.#router.navigateByUrl('/dashboard');
    }
  }
}
