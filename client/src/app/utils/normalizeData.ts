import { Normalized } from '../types/types';

export const normalizeData = <T extends { _id: string }>(nonNormalizedData: T[]) => {
  const normalized: Normalized<T> = {
    byId: {},
    allIds: [],
  };

  normalized.byId = nonNormalizedData.reduce((acc, curr) => {
    return {
      ...acc,
      [curr._id]: curr,
    };
  }, {});

  normalized.allIds = nonNormalizedData.map((item) => item._id);

  return normalized;
};
