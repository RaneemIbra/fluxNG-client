import { Component, input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'flux-input',
  imports: [InputTextModule, PasswordModule],
  templateUrl: './flux-input.html',
  styleUrl: './flux-input.scss',
})
export class FluxInput {
  inputType = input<'text' | 'password'>('text');
  inputIcon = input<string | null>(null);
  inputPlaceholder = input<string>('');
}
