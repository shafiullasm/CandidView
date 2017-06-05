import { Routes, RouterModule } from '@angular/router';
import { ProjectStatusComponent } from './project-status/project-status.component';
import { Statuscomponent } from './weeklyreport/status.component';

const appRoutes: Routes =
    [
        { path: '', component: ProjectStatusComponent },
        { path: 'report', component: Statuscomponent }
    ];


export const routing = RouterModule.forRoot(appRoutes);

