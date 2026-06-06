import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { FluxToolbar } from '../../components/toolbar/toolbar';

@Component({
  selector: 'flux-home-page',
  imports: [ToolbarModule, ButtonModule, FluxToolbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
