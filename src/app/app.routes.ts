import { Routes } from '@angular/router';
import { AppointmentDashboard } from './appointment-dashboard/appointment-dashboard';

export const routes: Routes = [
    {
        path: 'patient-messages',
        component: AppointmentDashboard,
    },
    { path: '**', redirectTo: 'patient-messages' }
];
