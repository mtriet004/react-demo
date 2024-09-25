import React from 'react'
import './RightContent.scss'
import CountDown from './CountDown'
const RightContent = (props) => {

    const {dataQuiz} = props

    const onTimeUp = () =>{
        props.handleFinish()

    }

  return (
    <>
        <div className='main-timer'>
            <CountDown onTimeUp = {onTimeUp}/>
        </div>
        <div className='main-question'>
            {dataQuiz && dataQuiz.length &&
                dataQuiz.map((question, index) =>{
                    return(
                        <div key ={`question - ${index}`} className='question'>{index + 1}</div>
                    )
                })
            }
            
        </div>
    </>
  )
}

export default RightContent