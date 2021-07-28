'use strict';
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

 const cleanupEntity = (entity) => {
  const { content } = entity;

  return { ...entity, content: { html: content.html, css: content.css } };
};

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
        entities = await strapi.services.country.search(ctx.query,[]);
    } else {
      entities = await strapi.services.country.find(ctx.query,[]);
    }
    // return entities.map((entity) => {
    //   return sanitizeEntity(cleanupEntity(entity), { model: strapi.models.country } /* eslint-disable-line no-undef */);
    // });
    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.country }));
  },

  /**
   * Retrieve a record.
   *
   * @return {Object}
   */
  async findOne(ctx) {
      const { id } = ctx.params;
      const entity = await strapi.services.country.findOne({ id });
      return sanitizeEntity(entity, { model: strapi.models.country });
  },

  /**
   * Count records.
   *
   * @return {Number}
   */
   count(ctx) {
      if (ctx.query._q) {
        return strapi.services.country.countSearch(ctx.query);
      }
      return strapi.services.country.count(ctx.query);
    },

  /**
   * Create a record.
   *
   * @return {Object}
   */

    async create(ctx) {
      let entity;
      if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        entity = await strapi.services.restaurant.create(data, { files });
      } else {
        entity = await strapi.services.restaurant.create(ctx.request.body);
      }
      return sanitizeEntity(entity, { model: strapi.models.restaurant });
    },

  /**
   * Update a record.
   *
   * @return {Object}
   */

   async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.restaurant.update({ id }, ctx.request.body);
    }

    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

  /**
   * Delete a record.
   *
   * @return {Object}
   */

   async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.restaurant.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

};
