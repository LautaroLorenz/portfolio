import { Component } from '@angular/core';
import { Work, PositionEnum } from 'src/app/models/timeline';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
	public readonly works: Work[] = [
		{
			company: 'Mobilecomputing',
			from: '2020-04-01',
			to: null,
			position: PositionEnum.frontend,
			tasks: [
				'Desarrollo de software web reactivo',
				'Experiencia en Angular 11+'
			]
		},
		{
			company: 'BTEK Studio',
			from: '2019-11-01',
			to: '2020-03-01',
			position: PositionEnum.frontend,
			tasks: [
				'Desarrollo de software web y Mobile',
				'Experiencia en Angular 7+'
			]
		},
		{
			company: 'Itego',
			from: '2016-06-01',
			to: '2019-10-01',
			position: PositionEnum.fullstack,
			tasks: [
				'Desarrollo de software web y Mobile',
				'Experiencia en Angular 2+ y Ionic',
				'Backend en PHP con framework YII'
			]
		},
		{
			company: 'Nandxor',
			from: '2015-02-01',
			to: '2016-05-01',
			position: PositionEnum.fullstack,
			tasks: [
				'Desarrollo de software web y software para sistemas embebidos',
				'Experiencia en C, C# y SQL'
			]
		}
	];
}
