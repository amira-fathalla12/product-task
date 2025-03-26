import { ICategory } from "../../categories/models/ICategory";

export interface IRecipes {
  id: number,
  name: string,
  imagePath: string,
  description: string,
  price: string,
  creationDate: string,
  modificationDate: string,
  category: ICategory[],
  tag: {
    id: number,
    name: string,
    creationDate: string,
    modificationDate: string,
  }
}
