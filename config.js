const _slugify = require('./helpers/slugify')

module.exports = {

  seo: {
    useUrlDispatcher: JSON.parse(process.env.SEO_USE_URL_DISPATCHER || false),
    productUrlPathMapper: (product) => {
      let destPath = ''
      if (product.category && product.category.length > 0) {
        const firstCat = product.category[0]
        destPath = (firstCat.path ? (firstCat.path) : _slugify(firstCat.name)) + '/' + (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      } else {
        destPath = (product.slug ? product.slug : _slugify(product.name + '-' + product.id))
      }
      destPath += '.html'
      console.log('Dest. product path = ', destPath)
      return destPath
    },
    categoryUrlPathMapper: (category) => {
      const destSlug = (category.url_path ? category.url_path + '/': '') + category.url_key
      console.log('Dest. cat path = ', destSlug)
      return destSlug
    },    
  },

  magento: {
    url: process.env.MAGENTO_URL || 'https://cmsdomain.io/rest/',
    consumerKey: process.env.MAGENTO_CONSUMER_KEY || 'byv3730rhoulpopcq64don8ukb8lf2gq',
    consumerSecret: process.env.MAGENTO_CONSUMER_SECRET || 'u9q4fcobv7vfx9td80oupa6uhexc27rb',
    accessToken: process.env.MAGENTO_ACCESS_TOKEN || '040xx3qy7s0j28o3q0exrfop579cy20m',
    accessTokenSecret: process.env.MAGENTO_ACCESS_TOKEN_SECRET || '7qunl3p505rubmr7u1ijt7odyialnih9',
    storeId: process.env.MAGENTO_STORE_ID || 1,
    currencyCode: process.env.MAGENTO_CURRENCY_CODE || 'USD'
  },

  vuestorefront: {
    invalidateCache: JSON.parse(typeof process.env.VS_INVALIDATE_CACHE === 'undefined' ? false : process.env.VS_INVALIDATE_CACHE),
    invalidateCacheUrl: process.env.VS_INVALIDATE_CACHE_URL || 'http://localhost:3000/invalidate?key=aeSu7aip&tag='
  },

  product: {
    expandConfigurableFilters: ['manufacturer'],
    synchronizeCatalogSpecialPrices: process.env.PRODUCTS_SPECIAL_PRICES || true,
    renderCatalogRegularPrices: process.env.PRODUCTS_RENDER_PRICES || true,
    excludeDisabledProducts: process.env.PRODUCTS_EXCLUDE_DISABLED || false
  },

  kue: {}, // default KUE config works on local redis instance. See KUE docs for non standard redis connections

  db: {
    driver: 'elasticsearch',
    url: process.env.DATABASE_URL || 'http://localhost:9200',
    indexName: process.env.INDEX_NAME || 'vue_storefront_catalog'
  },

  elasticsearch: {
    apiVersion: process.env.ELASTICSEARCH_API_VERSION || '5.6'
  },

  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379
  },

  passport: {
    jwtSecret: "MyS3cr3tK3Y",
    jwtSession: {
      session: false
    }
  }

}
