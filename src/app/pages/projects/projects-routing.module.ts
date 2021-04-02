import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent, PortfolioComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'catalog'
	},
	{
		path: 'catalog',
		component: CatalogComponent
	},
	{
		path: 'portfolio',
		component: PortfolioComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProjectsRoutingModule {}
