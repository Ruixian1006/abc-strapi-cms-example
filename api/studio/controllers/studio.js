'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
     /**
     * Retrieve records.
     *
     * @return {Array}
   */

  async find(ctx) {
    let entities;
    if (ctx.query._q) { // when there is query pass in 
        // Example: http://localhost:1337/countries/?_q=singapore
        entities = await strapi.services.studio.search(ctx.query);
    } else {
      entities = await strapi.services.studio.find(ctx.query);
    }
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.studio}));
  },
};
