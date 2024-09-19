import React, { useState } from 'react'
import Select from 'react-select';
import './Questions.scss'
import { LuPlus } from "react-icons/lu";
import { TiMinusOutline } from "react-icons/ti";
import { CiCircleMinus } from "react-icons/ci";
import { MdPlusOne } from "react-icons/md";

const Questions = (props) => {
  const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
  ];

  const [selectedQuiz, setSelectedQuiz] = useState({})
  
  return (
    <div className='questions-container'>
        <div className='title'>
          aaa
        </div>
        <div className='add-new-question'>
          <div className='col-6 form-group'>
            <label>Select Quiz</label>
            <Select
              defaultValue={selectedQuiz}
              onChange={setSelectedQuiz}
              options={options}
            />
          </div>
          
          <div className='mt-3'> 
            Add questions:
          </div>  
          <div>         
            <div className='questions-content'>              
                <div class="form-floating description">
                  <input type="text" className='form-control' placeholder="name@example.com" />
                  <label >Description</label>
                </div>
                <div className='group-upload'>
                  <label className='label-up'>Upload Image</label>
                  <input type='file' hidden></input>
                  <span>0 files is uploaded</span>
                </div>
                <div className='btn-add'>
                  <span>
                    <LuPlus className='icon-add'/>
                  </span>
                  <span>
                    <TiMinusOutline className='icon-remove'/>
                  </span>      
                </div>
            </div>
            <div className='answers-content'>
              <input 
                className="form-check-input isCorrect"
                type="checkbox" //5:20:08
              />
                <div class="form-floating answer-name">
                  <input type="text" className='form-control' placeholder="name@example.com" />
                  <label>Answer 1</label>
                </div>
                <div className='btn-group'>
                  <span>
                    <MdPlusOne className='icon-add'/>
                  </span>
                  <span>
                    <CiCircleMinus className='icon-remove'/>
                  </span>      
                </div>
            </div>
          </div>       
        </div>
    </div>  
  )
}

export default Questions