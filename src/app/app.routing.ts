import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './projectinfo/info.component';
import { Statuscomponent } from './weeklyreport/status.component';

const appRoutes: Routes =
    [   
     { path: '', component: InfoComponent },
     { path: 'report', component: Statuscomponent }
    ];


export const routing = RouterModule.forRoot(appRoutes);

