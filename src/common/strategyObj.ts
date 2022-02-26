import { Like, Equal} from 'typeorm';

export const strategyObj = {
  contains: data => {
    return Like(`%${data}%`);
  },
  equals: data => {
    return Equal(data);
  }
};
