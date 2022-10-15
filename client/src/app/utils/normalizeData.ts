import { Normalized, User } from '../types/types';

export const normalizeData = (nonNormalizedData: User[]) => {
  const normalized: Normalized = {
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
