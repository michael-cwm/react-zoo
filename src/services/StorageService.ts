import { IAnimal } from "../models/IAnimals";

const LOCALSTORAGE_KEY = "animals";

export const getList = (): IAnimal[] => {
  let valueFromLS = localStorage.getItem(LOCALSTORAGE_KEY) || "[]";
  return JSON.parse(valueFromLS) as IAnimal[];
};

export const save = (data: IAnimal[]): void => {
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(data));
};
