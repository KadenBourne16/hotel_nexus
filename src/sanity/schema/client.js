import {defineType, defineField}  from "sanity"

export const client = defineType({
    name: "client",
    title: "Client",
    type: "document",
    fields: [
        defineFields({
            name: "first_name",
            type: "string",
        }),
        defineFields({
            name: "middle_name",
            type: "string"
        }),
        defineFields({
            name: "last_name",
            type: "string"
        }),
        defineField({
            name: "gender",
            type: "string"
        }),
        defineField({
            name: "email",
            type: "string"
        }),
        defineField({
            name: "phone",
            type: "string"
        }),
        defineField({
            name: "password",
            type: "string"
        })
    ],

    
   preview: {
    select: {
        first_name: "first_name",
        last_name: "last_name",
    },
    prepare(selection) {
        const { first_name, last_name } = selection;
        return {
            title: `${first_name} ${last_name}`,
            subtitle: selection.gender,
        };
    }
   }
})