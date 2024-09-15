import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getDataQuiz } from '../../service/APIService'
import _ from 'lodash'
const DetailQuiz = () => {

  const param = useParams()
  const quizId = param.id 

  useEffect(() =>{
    fetchQuestion()
  }, [quizId])

  const fetchQuestion = async() =>{
    let res = await getDataQuiz(quizId)
    console.log(res)
    if(res && res.EC ===0){
        let raw = res.DT
        let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
            const answers = []
            let questionDescription, image = null;
            value.forEach((item, index) => {
                if(index ===0){
                    questionDescription = item.description
                    image = item.image
                }
                answers.push(item.answers)
            })
            return {color: key, answers, questionDescription, image}
        })
        .value()
        console.log(data)
    }
  }
  console.log('check param', param)  
  return (
    <div className='detail-quiz-container'>
        DetailQuiz
    </div>
  )
}

export default DetailQuiz