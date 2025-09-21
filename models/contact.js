import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    validate: {
      validator: function (v) {
        return /^[5-9][0-9]{9}$/.test(v);
      },
      message: props => `${props.value} is not a valid 10-digit mobile number!`,
    },

  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;
