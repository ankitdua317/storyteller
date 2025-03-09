import DATA from "../constants/data";
import Story from "../models/Story";

const fetchStories = (): Promise<Story[]> => {
  return new Promise<Story[]>((resolve) => {
    setTimeout(() => {
      resolve(DATA);
    }, 1000);
  });
};

export default fetchStories;
