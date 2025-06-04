export const API_ENDPOINT = {
  // Product Endpoint
  PRODUCT_V1_DETAIL: '/api/v1/products/details/:id',

  // Compose Endpoint
  COMPOSE_V1_HOME: '/api/v1/compose/home',

  // Config Endpoint
  CONFIG_V1_GET: '/api/v1/configs/:configKey',

  // Address Endpoint
  ADDRESS_V1_CREATE: '/api/v1/addresses'

} as const
