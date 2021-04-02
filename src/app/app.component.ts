import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	public redirectToLinkedin(): void {
		window.open('https://www.linkedin.com/in/lautaro-lorenz-792629195/');
	}
}
