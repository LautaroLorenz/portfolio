import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ExternalRoutesEnum } from 'src/app/models/external-routes';

@Component({
	selector: 'app-portfolio',
	templateUrl: './portfolio.component.html',
	styleUrls: ['./portfolio.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent {
	public externalRoutes = ExternalRoutesEnum;
}
