import { Component } from '@angular/core';
import { FluxInput } from '@flux-client/app/components/flux-input/flux-input';

@Component({
  selector: 'flux-signup',
  imports: [FluxInput],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {}
