import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'equipo',
        data: { pageTitle: 'tesisApp.equipo.home.title' },
        loadChildren: () => import('./equipo/equipo.module').then(m => m.EquipoModule),
      },
      {
        path: 'cantidad-x-modelo',
        data: { pageTitle: 'tesisApp.cantidadXModelo.home.title' },
        loadChildren: () => import('./cantidad-x-modelo/cantidad-x-modelo.module').then(m => m.CantidadXModeloModule),
      },
      {
        path: 'cantidad-xueb',
        data: { pageTitle: 'tesisApp.cantidadXUEB.home.title' },
        loadChildren: () => import('./cantidad-xueb/cantidad-xueb.module').then(m => m.CantidadXUEBModule),
      },
      {
        path: 'cantidad-x-marca',
        data: { pageTitle: 'tesisApp.cantidadXMarca.home.title' },
        loadChildren: () => import('./cantidad-x-marca/cantidad-x-marca.module').then(m => m.CantidadXMarcaModule),
      },
      {
        path: 'agregado-x-chofer',
        data: { pageTitle: 'tesisApp.agregadoXChofer.home.title' },
        loadChildren: () => import('./agregado-x-chofer/agregado-x-chofer.module').then(m => m.AgregadoXChoferModule),
      },
      {
        path: 'lubricantextipo',
        data: { pageTitle: 'tesisApp.lUBRICANTEXTIPO.home.title' },
        loadChildren: () => import('./lubricantextipo/lubricantextipo.module').then(m => m.LUBRICANTEXTIPOModule),
      },
      {
        path: 'lubricantexueb',
        data: { pageTitle: 'tesisApp.lUBRICANTEXUEB.home.title' },
        loadChildren: () => import('./lubricantexueb/lubricantexueb.module').then(m => m.LUBRICANTEXUEBModule),
      },
      {
        path: 'combustiblexueb',
        data: { pageTitle: 'tesisApp.cOMBUSTIBLEXUEB.home.title' },
        loadChildren: () => import('./combustiblexueb/combustiblexueb.module').then(m => m.COMBUSTIBLEXUEBModule),
      },
      {
        path: 'cantidadxtipoueb',
        data: { pageTitle: 'tesisApp.cANTIDADXTIPOUEB.home.title' },
        loadChildren: () => import('./cantidadxtipoueb/cantidadxtipoueb.module').then(m => m.CANTIDADXTIPOUEBModule),
      },
      {
        path: 'cantidadxtipo',
        data: { pageTitle: 'tesisApp.cANTIDADXTIPO.home.title' },
        loadChildren: () => import('./cantidadxtipo/cantidadxtipo.module').then(m => m.CANTIDADXTIPOModule),
      },
      {
        path: 'entregaxtipo',
        data: { pageTitle: 'tesisApp.eNTREGAXTIPO.home.title' },
        loadChildren: () => import('./entregaxtipo/entregaxtipo.module').then(m => m.ENTREGAXTIPOModule),
      },
      {
        path: 'recurso',
        data: { pageTitle: 'tesisApp.recurso.home.title' },
        loadChildren: () => import('./recurso/recurso.module').then(m => m.RecursoModule),
      },
      {
        path: 'asignacion',
        data: { pageTitle: 'tesisApp.asignacion.home.title' },
        loadChildren: () => import('./asignacion/asignacion.module').then(m => m.AsignacionModule),
      },
      {
        path: 'chofer',
        data: { pageTitle: 'tesisApp.chofer.home.title' },
        loadChildren: () => import('./chofer/chofer.module').then(m => m.ChoferModule),
      },
      {
        path: 'motor',
        data: { pageTitle: 'tesisApp.motor.home.title' },
        loadChildren: () => import('./motor/motor.module').then(m => m.MotorModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
