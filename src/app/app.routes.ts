import { Routes } from '@angular/router';

import { Home } from './home/home';
import { Game } from './game/game';
import { Results } from './results/results';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'game', component: Game },
  { path: 'results', component: Results }
];