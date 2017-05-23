import { Routes, RouterModule } from '@angular/router';
import { InfoComponent } from './projectinfo/info.component';
import {statuscomponent} from './weeklyreport/status.component';

const appRoutes: Routes =
    [
        
     { path: '', component: InfoComponent },
     { path: 'report', component: statuscomponent }

         
    ];


export const routing = RouterModule.forRoot(appRoutes);

