import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email : {type:String,unique:true,required:true,
    validate:{
      validator: function(v) {
        return /^[a-zA-Z]+@gmail.[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }},
    firstName : {type:String,required:true},
    lastName : {type:String,required:true},
    phone : {type:Number,required:true,validate:{
      validator: function(v) {
        return /^1[3456789]{1}(\d){8}$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }}
  },
  {
    timestamps : true
  }
);

const User = mongoose.model('user', userSchema);

export default User;