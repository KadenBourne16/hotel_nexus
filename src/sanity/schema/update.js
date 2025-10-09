import { defineType, defineField } from "sanity";

export const update = defineType({
  name: "update",
  title: "Update",
    type: "document",
    icon: () => "📝",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
        }),
        defineField({
            name: "date",
            title: "Date",
            type: "datetime",
            initialValue: (new Date()).toISOString(),
        }),
        defineField({
            name: "type",
            title: "Type",
            type: "string",
            options: {  list: [
                { title: 'Service', value: 'service' },
                { title: 'Event', value: 'event' },
                { title: 'Menu Update', value: 'menu' },
                { title: 'Announcement', value: 'announcement' }, ]
            }, 
        }),
    ]
});