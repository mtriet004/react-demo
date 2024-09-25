import React, {useRef} from 'react'
import './RightContent.scss'
import CountDown from './CountDown'
const RightContent = (props) => {

    const {dataQuiz} = props
    const refDiv = useRef([])

    const onTimeUp = () =>{
        props.handleFinish()

    }

    const getClassQuestion = (index, question) =>{
        if(question && question.answers.length > 0){
            let isUnAnswered =  question.answers.find(a => a.isSelected === true);
            if (isUnAnswered) {
                return 'question selected'
            }
        }
        return 'question '
    }

    const handleClickQuestion = (question, index) =>{
        props.setIndex(index)
        if(refDiv.current){
            refDiv.current.forEach(item =>{
                if(item && item.className ==='question clicked'){
                    item.className='question'
                }
            })
        }

        if(question && question.answers.length > 0){
            let isUnAnswered =  question.answers.find(a => a.isSelected === true);
            if (isUnAnswered) {
                return; 
            }
        }
        refDiv.current[index].className = 'question clicked'
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
                        <div key ={`question - ${index}`} className={getClassQuestion(index, question)}
                            onClick={() => handleClickQuestion(question, index)}
                            ref={element => refDiv.current[index] = element}
                        >{index + 1}</div>
                    )
                })
            }
            
        </div>
    </>
  )
}

export default RightContent