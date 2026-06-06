import { Component, input, forwardRef, signal, computed } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'flux-input',
  imports: [InputTextModule, PasswordModule, FormsModule, ReactiveFormsModule],
  templateUrl: './flux-input.html',
  styleUrl: './flux-input.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FluxInput),
      multi: true,
    },
  ],
})
export class FluxInput implements ControlValueAccessor {
  inputType = input<'text' | 'password'>('text');
  inputIcon = input<string | null>(null);
  inputPlaceholder = input<string>('');

  maxLength = input<number | null>(null);
  minLength = input<number | null>(null);
  disabled = input<boolean>(false);

  value = signal<string>('');

  onChange: any = () => {};
  onTouched: any = () => {};

  onValueChange(newValue: string): void {
    this.value.set(newValue);
    this.onChange(newValue);
  }

  writeValue(val: any): void {
    this.value.set(val || '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
