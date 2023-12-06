import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { MaestroComponent } from './componentes/maestro/maestro.component';
import { MateriaComponent } from './componentes/materia/materia.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'grupo/:id', component: MaestroComponent, canActivate: [AuthGuard] },
    { path: 'materia/:id', component: MateriaComponent },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule { }
