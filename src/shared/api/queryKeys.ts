export const queryKeys = {
  trending: {
    all: ['trending'] as const,
    countries: () => [...queryKeys.trending.all, 'countries'] as const,
  },

  favorites: {
    all: ['favorites'] as const,
    list: () => [...queryKeys.favorites.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.favorites.all, id] as const,
  },

  countries: {
    all: ['countries'] as const,
    list: () => [...queryKeys.countries.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.countries.all, 'detail', id] as const,
    paginated: (page: number) => [...queryKeys.countries.all, 'paginated', page] as const,
  },

  trips: {
    all: ['trips'] as const,
    list: (userId?: string) => userId ? [...queryKeys.trips.all, 'list', userId] as const : [...queryKeys.trips.all, 'list'] as const,
    detail: (id: string) => [...queryKeys.trips.all, 'detail', id] as const,
  },

  profile: {
    all: ['profile'] as const,
    me: () => [...queryKeys.profile.all, 'me'] as const,
  },
};
