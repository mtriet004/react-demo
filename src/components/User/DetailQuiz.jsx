import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuiz } from '../../service/APIService'

const DetailQuiz = () => {

  const param = useParams()
  const quizId = param.id 

  useEffect(() =>{
    fetchQuestion()
  }, [quizId])

  const fetchQuestion = async() =>{
    let res = await getDataQuiz(quizId)
    // console.log(res)
  }
  console.log('check param', param)  
  return (
    <div className='detail-quiz-container'>
        DetailQuiz
    </div>
  )
}

export default DetailQuiz