import React, { useEffect, useState } from 'react'
import Select from 'react-select';
import './Questions.scss'
import { LuPlus } from "react-icons/lu";
import { TiMinusOutline } from "react-icons/ti";
import { CiCircleMinus } from "react-icons/ci";
import { MdPlusOne } from "react-icons/md";
import { RiImageAddLine } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash'
import { PhotoProvider, PhotoView } from "react-photo-view";
import { createNewAnswer, createNewQuestion, getAllQuizForAdmin } from '../../../../service/APIService'

const Questions = (props) => {

  const [selectedQuiz, setSelectedQuiz] = useState({})
  // const [isPreviewImage, setIsPreviewImage] = useState(false)
  // const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [listQuiz, setListQuiz] = useState([])

  useEffect(() =>{
    fetchQuiz()
  }, [])

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

  const [questions, setQuestions] = useState(
    [
      {
        id: uuidv4(),
        description:'',
        imageFile:'',
        imageName: '',
        imageUrl:'',
        answers: [
          {
            id: uuidv4(),
            description: '',
            isCorrect: false,
          }
        ]
      }
    ]
  )

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
    //validate data

    //submit question

    await Promise.all(questions.map(async (question) => {
      const q = await createNewQuestion(+selectedQuiz.value, question.description, question.imageFile)

      //submit answer
      await Promise.all(question.answers.map( async (answer) => {
        await createNewAnswer(answer.description, answer.isCorrect, q.DT.id)
      }))
    }));

  }

  return (
    <div className='questions-container'>
        <div className='title'>
          aaa
        </div>
        <hr />
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
                          className='form-control'
                          placeholder="name@example.com"  
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
                                className='form-control'
                                placeholder="name@example.com"
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

export default Questions