import { Achievement } from './achievement.model';
import { Work } from './works.model';

export enum CardType {
	work,
	achievement
}

export interface TimelineItem {
	cardType: CardType;
}

export type Timeline = Work | Achievement;
