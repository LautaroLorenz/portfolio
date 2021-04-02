import { CardType, TimelineItem } from './timeline.model';

export enum PositionEnum {
	fullstack = 'Fullstack',
	frontend = 'Frontend',
	backend = 'Backend'
}

export interface Work extends TimelineItem {
	cardType: CardType.work;
	company: string;
	from: string;
	to: string | null;
	position: PositionEnum;
	tasks: string[];
}
