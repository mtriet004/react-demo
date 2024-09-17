import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getDataQuiz } from '../../service/APIService'
import _ from 'lodash'
import './DetailQuiz.scss'
const DetailQuiz = () => {

  const param = useParams()
  const quizId = param.id 
  const location = useLocation()
  console.log(location)

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
            <div className='question'>Question 1: CC</div>
            <div className='answer'>
              <div className='a-child'>A</div>
              <div className='b-child'>B</div>
              <div className='c-child'>C</div>
            </div>
          </div>
          <div className='footer'>           
            <button className='btn btn-secondary'>Back</button>
            <button className='btn btn-primary '>Next</button>
          </div>
        </div>
        <div className='right-content'>
            Count down
        </div>
    </div>
  )
}

export default DetailQuiz