const mongoose=require('mongoose');
const each_patient = new mongoose.Schema({
    email:{
        type:String,
    }
});
const expertsSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type:String,
    },
    web_usage_access:{
        type: Boolean,
        default: false,
    },
    patients:[each_patient]
});
const Expert = mongoose.model('signed_up_experts',expertsSchema);
module.exports=Expert;