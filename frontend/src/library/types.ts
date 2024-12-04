export interface theaterDetails{
    theaterName : string;
    address : string;
}

 export interface Theater {
    _id: string;
    theaterName: string;
    address: string;
    ownerID: string;
    screenIDs: string[];
    __v: number;
  }