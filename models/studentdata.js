const { type } = require('express/lib/response');
const mongoose =require('mongoose');

const studentSchema = mongoose.Schema({
    
    firstname: {
        type: String,
        required:true,
        unique: true
        
    },
    lastname: {
        type: String,
        required:true
    }, 
    class: {
        type: String,
        required:true
    },
    roll: {
        type: String,
        unique:true,
        required:true  
    },

    age:
    {
        type:Number,
        required:true  
    }, 
    address:
    {
    
      line1:
      {
          type:String,
          required:true
      },
      line2:
      {
          type:String,
          required:true
      },
      city:
      {
          type:String,
          required:true
      },
      state:
      {
        type:String,
        required:true
    },
    zip:
    {
        type:Number,
        required:true
    },
},
   
    number:
    {
          type:Number,
        required:true

    },

    mark:
    [
       {
           subject:
           {
               type:String,
               required:true
           },
           marks:
           {
              type:Number,
              required:true

           }
       }
    ],


    registered_on: {
        type: Date,
        default: new Date(),
    },

})

module.exports=mongoose.model('studentdata',studentSchema);



