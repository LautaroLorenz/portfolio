import { CardType, TimelineItem } from './timeline.model';

export interface Achievement extends TimelineItem {
	cardType: CardType.achievement;
	date: string;
	description: string;
}
