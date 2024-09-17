import React from 'react'
import _ from 'lodash'
import './Question.scss'
const Question = (props) => {
    const {data} = props
    if(_.isEmpty(data)){
        return (<></>)
    }

  return (
    <>
        {data.image && 
            <div className='q-content-img'>
                <img src={`data:image/jpeg;base64,${data.image}`} alt=''></img>
            </div>
        }     
        <div className='question'>Question {props.index + 1}: {data.questionDescription}</div>
        <div className='answer'>
            {data.answers && data.answers.length &&
                data.answers.map((item,index) =>{
                    return(
                        <div key={`answer-${index}`}
                         className='a-child'>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" />
                                <label className="form-check-label">
                                    {item.description}
                                </label>
                            </div>  
                        </div>
                    )          
                })
            }
        </div>
    </>
  )
}

export default Question