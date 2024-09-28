import React, { useEffect, useState } from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { getDataQuiz, postSubmitQuiz } from '../../service/APIService'
import _ from 'lodash'
import './DetailQuiz.scss'
import Question from './Question'
import ModalResult from './ModalResult'
import RightContent from './Content/RightContent'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next'
import Language from '../Header/Language'
const DetailQuiz = () => {

  const {t} = useTranslation()
  const param = useParams()
  const quizId = param.id 
  const location = useLocation()
  const [dataQuiz, setDataQuiz] = useState([])
  const [index, setIndex] = useState(0)
  const [isShowModalResult, setIsShowModalResult] = useState(false)
  const [dataModalResult, setDataModalResult] = useState({})
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false)
  const [isShowAnswers, setIsShowAnswers] = useState(false)


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
            let answers = []
            let questionDescription, image = null;
            value.forEach((item, index) => {
                if(index ===0){
                    questionDescription = item.description
                    image = item.image
                }
                item.answers.isSelected = false
                item.answers.isCorrect = false
                answers.push(item.answers)
            })
            answers = _.orderBy(answers, ['id'], ['asc'])
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
    //submot api
    let res = await postSubmitQuiz(payload)
    console.log('check res', res)
    if(res && res.EC===0){
      setIsSubmitQuiz(true)
      setDataModalResult({
        countCorrect: res.DT.countCorrect,
        countTotal: res.DT.countTotal,
        quizData: res.DT
      })
      setIsShowModalResult(true)

      //update DataQuiz with correct Answer
      if (res.DT && res.DT.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let a = res.DT.quizData;
        for (let q of a) {
            for (let i = 0; i < dataQuizClone.length; i++) {
                if (+q.questionId === +dataQuizClone[i].questionId) {
                    //update answer
                    let newAnswers = [];
                    for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                        let s = q.systemAnswers.find(item => +item.id === +dataQuizClone[i].answers[j].id)
                        if (s) {
                            dataQuizClone[i].answers[j].isCorrect = true;
                        }
                        newAnswers.push(dataQuizClone[i].answers[j]);
                    }
                    dataQuizClone[i].answers = newAnswers;
                }
            }
        }
        setDataQuiz(dataQuizClone);
    }
    } else{
      alert('something wrong...')
    }
  }

  const handleShowAnswers = () =>{
    if( !isSubmitQuiz) return 
    setIsShowAnswers(true)
  }
  return (
    <>
      <div className='header'>
        <Breadcrumb className='quiz-detail-new-header'>
          <NavLink to='/' className='breadcrumb-item'>
            {t('detailquiz.home')}
          </NavLink>
          <NavLink to='/users' className='breadcrumb-item'>
            {t('detailquiz.user')}
          </NavLink>
          <Breadcrumb.Item active>{t('detailquiz.data')} {quizId}</Breadcrumb.Item>
        </Breadcrumb>
        <Language className='a'/>
      </div>
      <div className='detail-quiz-container'>
          <div className='left-content'>
            <div className='title'>
            {t('detailquiz.data')} {quizId}: {location?.state?.quizTitle}
            </div>
            <hr />
            <div className='q-body'>
              <img alt=''></img>
            </div>
            <div className='q-content'>
              <Question data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} index={index} handleCheckBox={handleCheckBox} isShowAnswers = {isShowAnswers}
                />
            </div>
            <div className='footer'>           
              <button className='btn btn-secondary' onClick={() => handleBack()}>{t('detailquiz.btnBack')}</button>
              <button className='btn btn-primary ' onClick={() => handleNext()}>{t('detailquiz.btnNext')}</button>
              <button className='btn btn-success' disabled={isSubmitQuiz} onClick={() => handleFinish()}>{t('detailquiz.btnFinish')}</button>
            </div>
          </div>
          <div className='right-content'>
              <RightContent dataQuiz = {dataQuiz} handleFinish = {handleFinish} setIndex = {setIndex}/>
          </div>
          <ModalResult show = {isShowModalResult} setShow = {setIsShowModalResult} dataModalResult={dataModalResult}
          handleShowAnswers = {handleShowAnswers}/>
      </div>
    </>
  )
}

export default DetailQuiz