export interface IProfile {
  country: string,
  creationDate : string,
  email : string,
  group : {id: number, name: string, creationDate: string, modificationDate: string},
  id : number,
  imagePath : string,
  modificationDate : string,
  phoneNumber: string,
  userName : string
}
