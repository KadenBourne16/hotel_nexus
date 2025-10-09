import {staff} from "../schema/staff"
import {client} from "../schema/client"
import {rooms} from "../schema/rooms"
import {update} from "../schema/update"
import { booking } from "../schema/booking"

export const schema = {
  types: [staff, client, rooms, update, booking],
}
