
export interface IrefTo {
  // id: string;
  refTo_eId: string;
}



export interface Icomponent {
  // id: string;
  eId: string;
  componentNum: number;
  refTo: IrefTo[];
}

export interface Ilaw {
  // id: string;
  LawUri: number;
  LawName: string;
  Components: Icomponent[];
}
