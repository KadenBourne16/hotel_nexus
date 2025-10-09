import { defineType, defineField } from "sanity"

export const staff = defineType({
  name: "staff",
  title: "Staff",
  type: "document",
  icon: () =>  "👤",
  fields: [
    defineField({ 
      name: "staff_id",
      title: "Staff ID",
      type: "string",
    }),
    defineField({
      name: "first_name",
      type: "string",
    }),
    defineField({
      name: "middle_name",
      type: "string",
    }),
    defineField({
      name: "last_name",
      type: "string",
    }),
    defineField({
      name: "email",
      type: "string",
    }),
    defineField({
      name: "phone",
      type: "string",
    }),
    defineField({
      name: "position",
      type: "string",
      options: {  list: [
        { title: 'Manager', value: 'manager' },
        { title: 'Receptionist', value: 'receptionist' },
        { title: 'Housekeeping', value: 'housekeeping' },
        { title: 'Chef', value: 'chef' },
        { title: 'Waitstaff', value: 'waitstaff' },
      ] },
    }),
    defineField({
      name: "password",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      first_name: "first_name",
      last_name: "last_name",
      position: "position",
    },
    prepare(selection) {
      const { first_name, last_name } = selection;
      return {
        title: `${first_name} ${last_name}`,
        subtitle: selection.position,
      };
    },
  },  
})
