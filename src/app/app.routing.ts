import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './projectinfo/info.component';

const appRoutes: Routes =
    [
        { path: '', component: InfoComponent }
    ];

export const routing = RouterModule.forRoot(appRoutes);

