import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ExternalRoutesEnum } from './models/external-routes';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public readonly externalRoutesEnum = ExternalRoutesEnum;

	constructor(private readonly router: Router) {}

	public redirectTo(link: string): void {
		void this.router.navigate([link]);
	}

	public goTo(link: ExternalRoutesEnum): void {
		window.open(link);
	}
}
