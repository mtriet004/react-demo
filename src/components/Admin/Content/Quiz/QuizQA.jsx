import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './QuizQA.scss'
import { LuPlus } from "react-icons/lu";
import { TiMinusOutline } from "react-icons/ti";
import { CiCircleMinus } from "react-icons/ci";
import { MdPlusOne } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { PhotoProvider, PhotoView } from "react-photo-view";
import { getAllQuizForAdmin, getQuizWithQA, upsertQA } from '../../../../service/APIService'
import { toast } from 'react-toastify';


const QuizQA = (props) => {

  const initQuestions = [
    {
      id: uuidv4(),
      description:'',
      imageFile:'',
      imageName: '',
      imageUrl:'',
      isValidQuestion: false,
      answers: [
        {
          id: uuidv4(),
          description: '',
          isCorrect: false,
          isValidAnswer: false, 
        }
      ]
    }
  ]
  const [selectedQuiz, setSelectedQuiz] = useState({})
  const [listQuiz, setListQuiz] = useState([])

  useEffect(() =>{
    fetchQuiz()
  }, [])

  useEffect(() =>{
    if  (selectedQuiz && selectedQuiz.value){
      fetchQuizWithQA()
    }
    
  }, [selectedQuiz])

  function urltoFile(url, filename, mimeType){
    if (url.startsWith('data:')) {
        var arr = url.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[arr.length - 1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var file = new File([u8arr], filename, {type:mime || mimeType});
        return Promise.resolve(file);
    }
    return fetch(url)
        .then(res => res.arrayBuffer())
        .then(buf => new File([buf], filename,{type:mimeType}));
  }

  const fetchQuizWithQA = async () =>{
    let res = await getQuizWithQA(selectedQuiz.value)
    if(res && res.EC === 0){
      //convert base 64 to file object
      let newQA = []
      for( let i = 0; i < res.DT.qa.length; i++){
        let q = res.DT.qa[i]
        if(q.imageFile) {
          
          q.imageName = `Question-${q.id}.png`
          q.imageFile =
           await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`, 'image/png')
          q.imageUrl = URL.createObjectURL(q.imageFile)
        }
        newQA.push(q)
      }
      setQuestions(res.DT.qa)
      console.log('check new qa', newQA)
      console.log('check res', res)
    }  
  }

  const fetchQuiz =  async () =>{
      let res = await getAllQuizForAdmin();
      if(res && res.EC ===0){
          let newQuiz = res.DT.map(item =>{
            return{
              value: item.id,
              label: `${item.id} - ${item.description}`
            }
          })
          setListQuiz(newQuiz)
      }
  }

  const [questions, setQuestions] = useState(initQuestions)

  const handleAddRemoveQuestion = (type, id) =>{
    if(type==='ADD'){
      const newQuestion = {
        id: uuidv4(),
        description:'',
        imageFile:'',
        imageName: '',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          }
        ]
      }
      setQuestions([...questions,newQuestion])
    }
    if(type==='REMOVE'){
      let questionsClone = _.cloneDeep(questions)
      questionsClone = questionsClone.filter(item => item.id !== id)
      setQuestions(questionsClone)
    }
  }

  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    let questionsClone = _.cloneDeep(questions)
    if(type==='ADD'){   
      const newArr = {
        id: uuidv4(),
        description: '',
        isCorrect: false,
      }

      let index = questionsClone.findIndex(item => item.id === questionId)
      questionsClone[index].answers.push(newArr)
      setQuestions(questionsClone)
    }
    if(type==='REMOVE'){
      let index = questionsClone.findIndex(item => item.id === questionId)
      questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
      setQuestions(questionsClone)
    }
  }
  
  const handleOnChange = (type,questionId,value) =>{
    if(type === 'QUESTION'){
      let questionsClone = _.cloneDeep(questions)
      let index = questionsClone.findIndex(item => item.id === questionId)
      if(index > -1){
        questionsClone[index].description = value;
        setQuestions(questionsClone)
      }
    }
  }

  const handleOnChangeFileQuestion = (questionId, e) => {
    let questionsClone = _.cloneDeep(questions);
    let index = questionsClone.findIndex(item => item.id === questionId);
    
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      // Cập nhật đúng imageUrl cho câu hỏi hiện tại
      questionsClone[index].imageUrl = URL.createObjectURL(e.target.files[0]);
      questionsClone[index].imageFile = e.target.files[0];
      questionsClone[index].imageName = e.target.files[0].name;
      setQuestions(questionsClone);
    }
  }
  

  const handleAnswerQuesiton = (type, questionId, answerId, value) =>{
    let questionsClone = _.cloneDeep(questions)
    let index = questionsClone.findIndex(item => item.id === questionId) //map tạo ra 1 array mới
    if(index > -1){
      questionsClone[index].answers = questionsClone[index].answers.map((answer, index) => {
         if(answer.id === answerId){
          if(type === 'CHECKBOX'){
            answer.isCorrect = value;
          }
          if(type === 'INPUT'){
            answer.description =value;
          }
         }
         return answer
      })
      setQuestions(questionsClone)
    }
  }
  
  const handleSubmitQuestionForQuiz = async () =>{
    //todo  
    if(_.isEmpty(selectedQuiz)){
      toast.error('Please choose  a quiz')
      return
    }

    //validate answer
    let isValidAnswer = true
    // let indexQ, indexA = 0
    for (let i = 0 ; i<questions.length; i++){   
      for(let j=0 ; j<questions[i].answers.length;j++){
        if(!questions[i].answers[j].description){
          isValidAnswer = false
          // indexA = j
          break
        }
      }
      // indexQ = i
      if(isValidAnswer === false) break
    }

    if(isValidAnswer===false){
      questions.isValidAnswer=true
      return;
    }
    //validate question
    let isValidQuestion = true
    // let indexQ1 = 0
    for (let i = 0 ; i<questions.length; i++){   
      if(!questions[i].description){
        isValidQuestion=false
        // indexQ1=i
        return
      }
    }

    if(isValidQuestion===false){
      questions.isValidQuestion = true;
      return
    }
    let questionClone = _.cloneDeep(questions)
    console.log(questionClone)
    for(let i=0; i<questionClone.length;i++){
      if(questionClone[i].imageFile){
        questionClone[i].imageFile = await toBase64(questionClone[i].imageFile)
      }
    }
    let res = await upsertQA({
      quizId : selectedQuiz.value,
      questions : questionClone
    })


    if(res && res.EC===0){
      toast.success(res.EM)
      fetchQuizWithQA()
    }
    console.log('check res', res)
  }

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  console.log('check questions', questions)
  return (
    <div className='questions-container'>
        <div className='add-new-question'>
          <div className='col-6 form-group'>
            <label className='mb-2'>Select Quiz</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={listQuiz}
            />
          </div>        
          <div className='mt-3 mb-2'> 
            Add questions:
          </div>
          {
            questions && questions.length > 0 
            && questions.map((question, index) => {
              return (
                <div key={question.id} className='q-main mb-4'>         
                  <div className='questions-content'>              
                      <div className="form-floating description">
                      <input
                        type="text"
                        className={`form-control ${!question.description ? 'is-invalid' : ''}`}  // Nếu câu hỏi trống, thêm class 'is-invalid'
                        placeholder="Enter question description"
                        value={question.description}
                        onChange={(e) => handleOnChange('QUESTION', question.id, e.target.value)} 
                      />

                        <label >Question {index+1} description</label>
                      </div>
                      <div className='group-upload'>
                        <label htmlFor={`${question.id}`}>
                          <RiImageAddLine className='label-up'/> 
                        </label>
                        <input
                          id={`${question.id}`}
                          onChange={(e) => handleOnChangeFileQuestion(question.id, e)}
                          type='file'
                          hidden
                        />
                        <span>
                          <PhotoProvider>
                          {question.imageName ? 
                            <PhotoView src={question.imageUrl}>
                              <span className="image-name" style={{ cursor: 'pointer' }}>
                                {question.imageName}
                              </span>
                            </PhotoView>
                            : '0 files uploaded'}
                          </PhotoProvider>
                        </span>
                      </div>                  
                      <div className='btn-add'>
                        <span onClick={() => handleAddRemoveQuestion('ADD','')}>
                          <LuPlus className='icon-add'/>
                        </span>
                        {questions.length > 1 &&
                          <span onClick={() => handleAddRemoveQuestion('REMOVE',question.id)}>
                            <TiMinusOutline className='icon-remove'/>
                          </span>   
                        }   
                      </div>
                  </div>
                  {
                    question.answers && question.answers.length > 0 &&
                    question.answers.map((answer, index) =>{
                      return(
                        <div key={answer.id} className='answers-content'>
                          <input 
                            className="form-check-input isCorrect"
                            type="checkbox"
                            checked={answer.isCorrect}
                            onChange={(e) => handleAnswerQuesiton('CHECKBOX', question.id, answer.id, e.target.checked)}
                          />
                            <div className="form-floating answer-name">
                            <input
                              type="text"
                              className={`form-control ${!answer.description ? 'is-invalid' : ''}`}  // Nếu câu trả lời trống, thêm class 'is-invalid'
                              placeholder="Enter answer description"
                              value={answer.description}
                              onChange={(e) => handleAnswerQuesiton('INPUT', question.id, answer.id, e.target.value)}
                            />

                              <label>Answer {index + 1}</label>
                            </div>
                            <div className='btn-group'>
                              <span onClick={() => handleAddRemoveAnswer('ADD',question.id)}> 
                                <MdPlusOne className='icon-add'/>
                              </span>
                              {question.answers.length > 1 &&
                                <span onClick={() => handleAddRemoveAnswer('REMOVE', question.id, answer.id)}>
                                  <CiCircleMinus className='icon-remove'/>
                                </span>
                              }      
                            </div>
                        </div>
                      )
                    })
                  }   
                </div>
              )
            })
          } 
          {
            questions && questions.length > 0 && 
            <div>
              <button 
              onClick={() => handleSubmitQuestionForQuiz()}
              className='btn btn-success'>Save Questions</button>
            </div>
          }     
        </div>
      
    </div>  
  )
}

export default QuizQA