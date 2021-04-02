import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: 'home',
		loadChildren: () =>
			import('./pages/home/home.module').then((m) => m.HomeModule)
	},
	{
		path: 'timeline',
		loadChildren: () =>
			import('./pages/timeline/timeline.module').then(
				(m) => m.TimelineModule
			)
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: true })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
