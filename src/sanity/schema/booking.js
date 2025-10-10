import {defineType, defineField} from "sanity";

export const booking = defineType({
    name: "booking",
    title: "Booking",
    type: "document",
    icon: () => "📅",
    fields: [
        defineField({
            name: "client",
            title: "Client",
            type: "reference",
            to: [{type: "client"}],
        }),
        defineField({
            name: "room",
            title: "Room",
            type: "reference",
            to: [{type: "rooms"}],
        }),
        defineField({
            name: "check_in",
            title: "Check-In Date",
            type: "date",
            options: {dateFormat: "YYYY-MM-DD"},
        }),
        defineField({
            name: "check_out",
            title: "Check-Out Date",
            type: "date",
            options: {dateFormat: "YYYY-MM-DD"},
        }),
        defineField({
            name: "status",
            title: "Status",
            type: "string",
            options: {  list: [
                {title: 'Booked', value: 'booked'},
                {title: 'Checked In', value: 'checked_in'},
                {title: 'Checked Out', value: 'checked_out'},
                {title: 'Cancelled', value: 'cancelled'},
            ]},
        }),
        defineField({
            name: "created_at",
            title: "Created At",
            type: "datetime",
            options: {dateFormat: "YYYY-MM-DD", timeFormat: "HH:mm"},
            initialValue: (new Date()).toISOString(),
        })
    ],
});