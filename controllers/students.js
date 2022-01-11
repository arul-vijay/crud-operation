const e = require('express');
const express= require('express');
const mongoose= require('mongoose');

const Student= require('../models/studentdata');

//get response

const getStudents = async (req, res) => {
    try {
        const student= await Student.find();
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data not found in Database');
    }
}
module.exports.getStudents= getStudents;



// get specific student by id method

const getspecStudent = async (req,res) => {
    
      try{
         const post = await Student.findById(req.params.id)
         if(!post)
         throw Error("No items")
         res.status(200).json(post)
        }
        catch(err)
        {
            res.status(400).json('Invalid Id')
        }
    
}
module.exports.getspecStudent= getspecStudent;



///post student

const createstudent =  async (req, res) => {
    console.log(req.body);
let address = {};
address.line1 = req.body.address.line1;
address.line2 = req.body.address.line2;
address.city = req.body.address.city;
address.state= req.body.address.state;
address.zip= req.body.address.zip;
req.body.address = address;
let array = [];
req.body.marks.forEach((mark) => {
    let obj = {};
    obj.subject = mark.subject;
    obj.marks = mark.marks;
    array.push(mark);
})
req.body.mark = array;

    const newstudent = new Student({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        class:req.body.class,
        roll:req.body.roll,
        age:req.body.age,
        address:req.body.address,
        subjects:req.body.subjects,  
        number:req.body.number,
        mark:array,
     
      
    })
    try {
        await newstudent.save();

        res.status(201).json(newstudent);

    } catch(error) {
        res.status(400).json('Data Not Posted');
    }

}

module.exports.createstudent= createstudent;


//update student

const updatestudent = async (req, res) => {
    const roll= req.params.roll;
    let array = [];
req.body.marks.forEach((mark) => {
    let obj = {};
    obj.subject = mark.subject;
    obj.marks = mark.marks;
    array.push(mark);
})
    try{
     
        await Student.findOneAndUpdate({
            roll: roll,},
        {   
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            age:req.body.age,
            class:req.body.class,
            roll:req.body.roll,
            address:req.body.address,
            number:req.body.number,
            subjects:req.body.subjects,
            mark:array,
            created_on:req.body.created_on
        }
        )
        res.status(202).json('Data Updated Successfully');

    } catch (error) {
        res.status(401).json('Data Not Updated');
    }
    
}


module.exports.updatestudent= updatestudent;



//delete student

const deletestudent = async (req, res) => {
    const roll= req.params.roll;

    try {
        let data= await Student.findOneAndRemove({roll: roll});
        if (data) {
            res.status(200).json('data was deleted');    
        } else {
            res.status(404).json('data not found');
        }
        
        

    }catch(error) {
        res.status(402).json({message: error.message});
    }
}


module.exports.deletestudent= deletestudent;



// Greater than Operators and Sort

const studentOperators = async (req, res) => {
    try {
        const student= await Student.find({ age: { $gt: 20}})
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.studentOperators= studentOperators;


// AND operator


const andOperators = async (req, res) => {
    try {
        const student= await Student.find({$and:[{age:30},{firstname:"k7"}]});
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.andOperators= andOperators;

// OR operator

const orOperators = async (req, res) => {
    try {
        const student= await Student.find({$or:[{age:16},{firstname:"k7"}]});
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.orOperators= orOperators;

//IN operator

const inOperators = async (req, res) => {
    try {
        const student= await Student.find({"age":{$in:[16,23]}});
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.inOperators= inOperators;


///access object of object

const filterObject = async (req, res) => {
    try {       
        const stud = await Student.find({"address.city":"koyambedu"});
        res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.filterObject= filterObject;


///access array of object

const filterSpec = async (req, res) => {
    try {       
        const stud = await Student.find({mark:{$elemMatch:{"subject":"Tamil","marks":90}}});;
        res.status(200).json(stud);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.filterSpec= filterSpec;



//AGGREGATION METHOD

const Aggregation = async (req, res) => {
    try {

        const student= await Student.aggregate([
               
              //match method
               {
                $match:{age:{$gt:14}}
                },
                
                  //group method
                   {
                    $group:{_id:
                        {
                            firstname:"$firstname",
                            roll:"$roll",
                            class:"$class",
                            city:"$address.city"
                         }
                        }
                    },
                         //sort method
                      {
                        $sort:{"_id.firstname":1}
                        },

                          //project method
                        {
                            $project:{"_id.firstname":1,"_id.roll":1,"_id.city":1}
                        },

                         //limit method
                     {
                         $limit:3
                     }
        ]);
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.Aggregation= Aggregation;


//UNWIND OPERATION

const Unwind = async (req, res) => {
    try {
        const student= await Student.aggregate([


            {$unwind:"$mark"},
            {
               $match:{age:{$gt:14}}
            },
            {
                $project:{firstname:1,mark:1}
            }
        ]);

        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.Unwind= Unwind; 

//Search

const Search = async (req, res) => {
    try {
       const student= await Student.find({$text:{$search:"edison"}});
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.Search= Search;

//Regex

const Regex = async (req, res) => {
    try {
       const student= await Student.find({firstname:{$in:[/^a/i,/n$/i]}});
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.Regex= Regex;


//agggregation AND
const aggAnd = async (req, res) => {
    try {
        const student= await Student.aggregate([
            {
               $match:{$and:[{firstname:"arul"},{lastname:"m"}]}
            },
            {
                $group:{_id:{age:"$age",number:"$number"}}
            }
          
        ]);

        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.aggAnd= aggAnd; 

//agggregation OR
const aggOR = async (req, res) => {
    try {
        const student= await Student.aggregate([
            {
               $match:{$or:[{firstname:"arul"},{lastname:"s"}]}
            },
            {
                $group:{_id:{age:"$age",class:"$class"}}
            }
          
        ]);

        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.aggOR= aggOR; 



//aggregation IN
const aggIN = async (req, res) => {
    try {
        const student= await Student.aggregate([
            {
               $match:{age:{$in:[16,23]}}
            },
            {
                $group:{_id:{firstname:"$firstname",lastname:"$lastname",age:"$age"}}
            },
            {
                $sort:{ "_id.age": 1 }
            },
          
        ]);

        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.aggIN= aggIN


//agggregation elematch

const aggElem = async (req, res) => {
    try {
        const student= await Student.aggregate([

            {
               $match:{mark:{$elemMatch:{"subject":"Science","marks":100}}}
            },
            {
                $group:{_id:{firstname:"$firstname",lastname:"$lastname",age:"$age",subject:"$mark.subject",marks:"$mark.marks"}}
            },
        
          
        ]);

        res.status(200).json(student);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
}
module.exports.aggElem= aggElem


//pagination

const Pagination = async (req, res) => {
    const {  page = 1, limit = 3 }=req.query;
   
    try {
        const student= await Student.find().skip((page-1)*limit).limit(limit*1);
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data was not found');
    }
}
module.exports.Pagination= Pagination;


//SET operation

const Set = async (req, res) => {

    try {
       const student= await Student.updateOne({roll:req.body.roll},{$set:{firstname:req.body.firstname,class:req.body.class}},{});
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data was not found');
    }
}
module.exports.Set= Set;

//UNSET operation
const unSet = async (req, res) => {

    try {
        const student= await Student.updateOne(
            {roll:req.body.roll},{$unset:{firstname:req.body.firstname,class:req.body.class}},{}
            );
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data was not found');
    }
}
module.exports.unSet= unSet;


//POP

const Pop = async (req, res) => {
    try {
        const student= await Student.updateOne(
            {roll:req.body.roll},{$pop:{mark:req.body.mark}},{}
            );
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data not poped');
    }
}
module.exports.Pop= Pop;

//PUSH

const Push = async (req, res) => {
    try {
        const student= await Student.updateOne(
            {roll:req.body.roll},
            {$push:{mark:{subject:req.body.subject,marks:req.body.marks}}}
           ,{}
            );
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data not pushed');
    }
}
module.exports.Push= Push;


//PULL

const Pull = async (req, res) => {
    try {
        const student= await Student.updateOne(
            {roll:req.body.roll},
            {$pull:{mark:{subject:req.body.subject,marks:req.body.marks}}},{}
            );
        
        res.status(200).json(student);
    } catch(error) {
        res.status(404).json('Data not pulled');
    }
}
module.exports.Pull= Pull;