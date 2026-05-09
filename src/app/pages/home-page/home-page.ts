import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home-page',
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
