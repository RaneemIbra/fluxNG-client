import { Routes } from '@angular/router';
import { HomePage } from './pages/home-page/home-page';
import { Signup } from './pages/signup/signup';

export const routes: Routes = [
  {
    path: '',
    component: Signup,
  },
  {
    path: 'Home',
    component: HomePage,
  },
];
