export type Problem = {
  id: number;
  title: string;
  problemStatement: string;
  examples: Example[];
  constraints: string;
  order: number
  starterCode: string
  handlerFuncation: ((fn:any) => boolean) | string
  starterFunctionName:  string
};




export type Example = {
  id: string;
  inputText: string;
  outputText: string;
  explanation?: string;
  img?: string;
};

export type DBProblem = {
  id: string
  title: string
  category: string
  difficulty: string
  likes: number
  dislike: number
  order: number
  videoId?: string
  link?: string
}
