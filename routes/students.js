const express = require("express");

const  student_Act = require("../controllers/students"); 

const router = express.Router();

router.get('/', student_Act.getStudents);
router.get('/operator', student_Act.studentOperators);
router.get('/and', student_Act.andOperators);
router.get('/search', student_Act.Search);
router.get('/or', student_Act.orOperators);
router.get('/array', student_Act.filterSpec);
router.get('/object', student_Act.filterObject);
router.get('/in', student_Act.inOperators);
router.get('/aggregation', student_Act.Aggregation);
router.get('/unwind', student_Act.Unwind);
router.get('/regex', student_Act.Regex);
router.get('/aggand', student_Act.aggAnd);
router.get('/aggor', student_Act.aggOR);
router.get('/aggin', student_Act.aggIN);
router.get('/aggelem', student_Act.aggElem);
router.get('/page', student_Act.Pagination);
router.post('/set', student_Act.Set);
router.post('/unset', student_Act.unSet);
router.post('/pop', student_Act.Pop);
router.post('/push', student_Act.Push);
router.post('/pull', student_Act.Pull);
router.get('/:id', student_Act.getspecStudent);
router.post('/', student_Act.createstudent);
router.put('/:roll', student_Act.updatestudent);
router.delete('/:roll', student_Act.deletestudent);

module.exports=router;