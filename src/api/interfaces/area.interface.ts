

export  interface IAreaRepository {

    findAll?(clientId:number): Promise<any[]>;

 }

 export  interface IAreaServices {

     findAll?(clientId:number): Promise<any[]>;

 }
