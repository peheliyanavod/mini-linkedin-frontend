import { Routes } from '@angular/router';
// Import the new components you just generated!
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';

export const routes: Routes = [
  { path: '', component: Home },         // http://localhost:4200/ (The default page)
  { path: 'profile', component: Profile } // http://localhost:4200/profile
];