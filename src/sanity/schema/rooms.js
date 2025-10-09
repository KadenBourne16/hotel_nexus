import { defineType, defineField } from "sanity";

export const rooms = defineType({
  name: "rooms",
  title: "Rooms",
  type: "document",
  icon: () => "🛏️",
  fields: [
        defineField({
            name: "image",
            title: "Image",
            type: "array",
            of: [{ type: "image" }],
            options: { hotspot: true },
        }),
        defineField({
            name: "room_number",
            title: "Room Number",
            type: "string",
        }),
        defineField({
            name: "type",
            title: "Type",
            type: "string",
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {  list: [
                { title: 'Available', value: 'available' },
                { title: 'Occupied', value: 'occupied' },
                { title: 'Maintenance', value: 'maintenance' }, ]
            },
        }),
        defineField({
            name: "price",
            title: "Price",
            type: "number",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "amenities",
            title: "Amenities",
            type: "array",
            of: [{ type: "string" }],
            description: "List of amenities available in the room",
        }),
        defineField({
            name: "capacity",
            title: "Capacity",
            type: "number",
            description: "Maximum number of guests allowed",
        }),
        defineField({
            name: "rating",
            title: "Rating",
            type: "number",
            description: "Average customer rating",
            options: { min: 1, max: 5, step: 0.1 },
        }),
        defineField({
            name: "services",
            title: "Services",
            description: "Additional services available with the room (e.g., room service, laundry, wifi, parking, coffee etc)",
            type: "array",
            of: [{ type: "string" }],
            description: "Additional services available with the room",
        }),
    ]
});