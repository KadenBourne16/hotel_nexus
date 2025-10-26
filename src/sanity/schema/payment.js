import { defineType, defineField } from "sanity";

export const payments = defineType({
  name: "payments",
  title: "Payments",
  type: "document",
  icon: () => "💳",
  fields: [
    defineField({
      name: "reservation",
      title: "Reservation",
      type: "reference",
      to: [{ type: "booking" }], // references reservation (booking)
    }),
    defineField({
      name: "amount",
      title: "Amount",
      type: "number",
      description: "Total amount paid for the booking",
      validation: (Rule) => Rule.required().positive(),
    }),
    defineField({
      name: "status",
      title: "Payment Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Paid", value: "paid" },
          { title: "Failed", value: "failed" },
          { title: "Refunded", value: "refunded" },
        ],
        layout: "dropdown",
      },
    }),
    defineField({
      name: "provider_ref",
      title: "Provider Reference",
      type: "string",
      description: "Transaction reference from the payment provider",
    }),
    defineField({
      name: "paid_at",
      title: "Paid At",
      type: "datetime",
      description: "Date and time when payment was completed",
      options: { dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm" },
    }),
  ],
  preview: {
    select: {
      title: "provider_ref",
      subtitle: "status",
    },
    prepare(selection) {
      const { title, subtitle } = selection;
      return {
        title: title || "Payment Record",
        subtitle: `Status: ${subtitle}`,
      };
    },
  },
});
