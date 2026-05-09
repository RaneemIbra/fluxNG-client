import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from '../../components/toolbar/toolbar';

@Component({
  selector: 'app-home-page',
  imports: [ToolbarModule, ButtonModule, Toolbar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.scss',
})
export class HomePage {}
