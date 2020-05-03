function He() {
  this.routerConfig = {};
}

const $he = new He();

window.$he = $he;
 
export function setRoutes(routerConfig) {
  $he.routerConfig = routerConfig;
};

export function getRoutes() {
  return $he.routerConfig;
};
