export enum PositionEnum {
	fullstack = 'Fullstack',
	frontend = 'Frontend',
	backend = 'Backend'
}

export interface Work {
	company: string;
	from: string;
	to: string | null;
	position: PositionEnum;
	tasks: string[];
}
