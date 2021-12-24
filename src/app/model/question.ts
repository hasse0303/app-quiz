export interface Answer {
  id:number;
	text?: string;
  correct?:boolean
}

export interface Question {
  id:number;
	type?: string;
	question?: string;
	answer?: Answer[];
}
