import { z } from "zod";

const discountCreationValidationSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be string",
  }),
  product_name: z.string({
    invalid_type_error: "Name must be string",
  }),
  product_price: z.number({
    invalid_type_error: "Price must be number",
  }),
  product_discount: z.number({
    invalid_type_error: "Discount must be number",
  }),
  productId: z.string({
    invalid_type_error: "Id must be MongoDB Id",
  }),
});

const discountUpdateValidationSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be string",
    })
    .optional(),
  product_name: z
    .string({
      invalid_type_error: "Name must be string",
    })
    .optional(),
  product_price: z
    .number({
      invalid_type_error: "Price must be number",
    })
    .optional(),
  product_discount: z
    .number({
      invalid_type_error: "Discount must be number",
    })
    .optional(),
  productId: z
    .string({
      invalid_type_error: "Id must be MongoDB Id",
    })
    .optional(),
});

export const DiscountValidation = {
  discountCreationValidationSchema,
  discountUpdateValidationSchema,
};
