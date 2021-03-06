'use strict';
const { sanitizeEntity } = require('strapi-utils');

const cleanupEntity = (entity) => {
  const { content } = entity;

  return { ...entity, content: { html: content.html, css: content.css } };
};
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        let entities;
        if (ctx.query._q) {
          entities = await strapi.services.course-page.search(ctx.query); /* eslint-disable-line no-undef */
        } else {
          entities = await strapi.services.course-page.find(ctx.query); /* eslint-disable-line no-undef */
        }
    
        return entities.map((entity) => {
          return sanitizeEntity(cleanupEntity(entity), { model: strapi.models.course-page } /* eslint-disable-line no-undef */);
        });
      },
      async findOne(ctx) {
        const { id } = ctx.params;
    
        const entity = await strapi.services.course-page.findOne({ id }); /* eslint-disable-line no-undef */
    
        return sanitizeEntity(cleanupEntity(entity), { model: strapi.models.course-page } /* eslint-disable-line no-undef */);
      },
};
