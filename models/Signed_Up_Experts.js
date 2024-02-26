const mongoose=require('mongoose');
const expertsSchema=new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
});
const Expert = mongoose.model('signed_up_experts',expertsSchema);
module.exports=Expert;