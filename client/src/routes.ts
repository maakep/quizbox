export const ROUTES = {
  ROOT: '/',
  MONITOR: '/monitor',
  MONITOR_GAME: '/monitor/:id',
  GAME: '/game/:id',
  RESULTS: '/game/:id/results',
};

export const routeWithId = (route: string, id: string) => {
  return route.replace(':id', id.toUpperCase());
};
