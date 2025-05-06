import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  text: { type: String, required: true},
  location:{
    type: { type: String, enum: ["Ponto"], required: true, default: "Ponto"},
    coordinates: { type: [Number], required: true}
  }
})

export default AddressSchema;