export interface IUsers {
  id: number,
  userName: string,
  email: string,
  country: string,
  phoneNumber: string,
  imagePath: string,
  group: {
    id: string,
    name: string,
    creationDate: string,
    modificationDate: string
  },
  creationDate: string,
  modificationDate: string
}
