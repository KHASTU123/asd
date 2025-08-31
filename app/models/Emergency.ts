import mongoose, { Schema, model, models } from "mongoose"

const HospitalSchema = new Schema({
  name: String,
  specialty: String,
  phone: String,
  address: String,
  hours: String,
  doctor: String,
  doctorPhone: String,
  type: { type: String, default: "hospital" },
})

const HotlineSchema = new Schema({
  name: String,
  phone: String,
  hours: String,
})

const ProvinceSchema = new Schema({
  name: String,
  hospitals: [HospitalSchema],
  hotlines: [HotlineSchema],
})

const RegionSchema = new Schema({
  key: { type: String, enum: ["bac", "trung", "nam"], required: true },
  name: String,
  provinces: [ProvinceSchema],
})

export const Emergency =
  models.Emergency || model("Emergency", RegionSchema)
