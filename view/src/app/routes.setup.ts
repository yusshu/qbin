import { RouterModule } from '@angular/router';
import { CreateComponent } from './compose/create/create.component';
import { ViewComponent } from './compose/view/view.component';

/**
 * Module with providers that registers all
 * the routes and its components of the entire
 * application.
 */
export const RoutesSetup = RouterModule.forRoot([
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'create'
  },
  {
    path: 'create',
    component: CreateComponent
  },
  {
    path: '**',
    component: ViewComponent
  }
]);
