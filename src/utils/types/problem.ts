export type Problem = {
	id: string;
	title: string;
	problemStatement: string;
	examples: Example[];
	constraints: string;
	order: number;
	starterCode: string;
	handlerFunction: ((fn: (nums: number[], target: number) => number[]) => boolean) | string;
	starterFunctionName: string;
};

export type Example = {
	id: number;
	inputText: string;
	outputText: string;
	explanation?: string;
};