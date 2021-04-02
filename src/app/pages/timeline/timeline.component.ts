import { Component } from '@angular/core';
import { CardType, PositionEnum, Timeline } from 'src/app/models/timeline';

@Component({
	selector: 'app-timeline',
	templateUrl: './timeline.component.html',
	styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent {
	public readonly timelines: Timeline[] = [
		{
			cardType: CardType.achievement,
			date: '2021-04-01',
			description: 'Creación del portfolio',
			img: './assets/img/two_happy_minions.jpg'
		},
		{
			cardType: CardType.work,
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
			cardType: CardType.work,
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
			cardType: CardType.work,
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
			cardType: CardType.work,
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

	public readonly cardTypes = CardType;
}
