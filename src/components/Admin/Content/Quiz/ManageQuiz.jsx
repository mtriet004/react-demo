import React, { useState } from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'

const options = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
];


const handleChangeFile = (e) =>{

}

const ManageQuiz = (props) => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [type, setType] = useState('Easy')
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
  return (
    <div className='quiz-container'>
        <div className='title'>
            Manage Quizzes
        </div>
        <hr />
        <div className='add-new'>
            
            <fieldset className='border rounde-3 p-3'>
                <legend className='float-none w-auto px-3'>Add new Quiz:</legend>
                <div className="form-floating mb-3">
                    <input type="email"
                     className="form-control"
                     placeholder='Enter Quiz Name'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     />
                    <label>Name</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" placeholder="Enter Quiz Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                    <label>Description</label>
                </div>
                <div className='my-3'>
                    <Select
                        value={type}
                        onChange={(e) => setType(e)}
                        options={options}
                        placeholder='Quiz Type'
                    />
                </div>
                <div className='more-actions form-group'>                    
                    <label className='form-label'>Upload Image</label>
                    <input type='file' className='form-control'
                        onChange={(e) => handleChangeFile(e)}
                    ></input>
                    

                </div>
            </fieldset>
        </div>
        <div className='list-detail'>
            Table
        </div>
    </div>
  )
}

export default ManageQuiz