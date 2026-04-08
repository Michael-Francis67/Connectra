import Joi from 'joi';

export const clerkWebhookSchema = Joi.object({
  type: Joi.string().required(),
  data: Joi.object({
    id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email_addresses: Joi.array()
      .items(
        Joi.object({
          email_address: Joi.string().required(),
        }),
      )
      .min(1)
      .required(),
    username: Joi.string().optional(),
    image_url: Joi.string().required(),
  }),
});
