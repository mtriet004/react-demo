import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../service/APIService'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'
import ModalResult from './ModalResult'
import RightContent from './Content/RightContent'

const DetailQuiz = () => {

  const param = useParams()
  const quizId = param.id 
  const location = useLocation()
  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({})

  // console.log(location)

  useEffect(() =>{
    fetchQuestion()
  }, [quizId])

  const fetchQuestion = async() =>{
    let res = await getDataQuiz(quizId)
    // console.log(res)
    if(res && res.EC ===0){
        let raw = res.DT
        let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, questionId) => {
            const answers = []
            let questionDescription, image = null;
            value.forEach((item, index) => {
                if(index ===0){
                    questionDescription = item.description
                    image = item.image
                }
                item.answers.isSelected = false
                answers.push(item.answers)
            })
            return {questionId, answers, questionDescription, image}
        })
        .value()
        // console.log(data)
        setDataQuiz(data)
    }
  }

  const handleCheckBox = (answerId, questionId) =>{
    let dataQuizClone = _.cloneDeep(dataQuiz)
    let question = dataQuizClone.find(item => +item.questionId === +questionId)
    if(question && question.answers){
      question.answers = question.answers.map(item =>{
        if(+item.id === +answerId){
          item.isSelected = !item.isSelected
        }
        return item
      })
    }

    let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
    if(index > -1){
      dataQuizClone[index] = question
      setDataQuiz(dataQuizClone)
    }
  }

  const handleBack = () =>{
    if(dataQuiz && dataQuiz.length && index > 0){
      setIndex(index - 1)
    }
  }

  const handleNext = () =>{
    if(dataQuiz && dataQuiz.length > index + 1){
      setIndex(index+1)
    }
  }

  const handleFinish = async () =>{
    let payload = {
      quizId : +quizId,
      answers : []
    }
    let answers = []
    if(dataQuiz && dataQuiz.length > 0){
      dataQuiz.forEach(question => {
        let questionId = question.questionId
        let userAnswerId = []

        question.answers.forEach(a =>{
          if(a.isSelected === true){
            userAnswerId.push(a.id)
          }
        })
        answers.push({
          questionId : +questionId,
          userAnswerId: userAnswerId
        })

      })
    }

    payload.answers = answers
    // console.log('handle before submit', payload)
    let res = await postSubmitQuiz(payload)
    console.log('check res', res)
    if(res && res.EC===0){
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT
      })
      setIsShowModalResult(true)
    }else{
      alert('something wrong...')
    }

  }

  // useEffect(() => {
  //   console.log('Updated dataQuiz:', dataQuiz); // Kiểm tra dataQuiz sau khi nó được cập nhật
  // }, [dataQuiz]); // Theo dõi khi dataQuiz thay đổi


  return (
    <div className='detail-quiz-container'>
        <div className='left-content'>
          <div className='title'>
            Quiz {quizId}: {location?.state?.quizTitle}
          </div>
          <hr />
          <div className='q-body'>
            <img alt=''></img>
          </div>
          <div className='q-content'>
            <Question data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} index={index} handleCheckBox={handleCheckBox}
              />
          </div>
          <div className='footer'>           
            <button className='btn btn-secondary' onClick={() => handleBack()}>Back</button>
            <button className='btn btn-primary ' onClick={() => handleNext()}>Next</button>
            <button className='btn btn-info' onClick={() => handleFinish()}>Finish</button>
          </div>
        </div>
        <div className='right-content'>
            <RightContent dataQuiz = {dataQuiz} handleFinish = {handleFinish}/>
        </div>
        <ModalResult show = {isShowModalResult} setShow = {setIsShowModalResult} dataModalResult={dataModalResult}/>
    </div>
  )
}

export default DetailQuiz