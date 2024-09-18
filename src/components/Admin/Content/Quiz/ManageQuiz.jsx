import React, { useState } from 'react'
import './ManageQuiz.scss'
import Select from 'react-select'
import { createNewQuiz } from '../../../../service/APIService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';

const options = [
    { value: 'EASY', label: 'Easy' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'HARD', label: 'Hard' },
];

const ManageQuiz = (props) => {
    const [name,setName] = useState('')
    const [description,setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)

    const handleChangeFile = (e) =>{
        if(e.target && e.target.files && e.target.files[0]){
            setPreviewImage(URL.createObjectURL(e.target.files[0])) //hàm cực căng
            setImage(e.target.files[0])
        } 
    }

    const handleSubmitQuiz = async (e) =>{
        //validate
        if(!name || !description){
            toast.error('Name/Description required')
            return
        }
        let res = await createNewQuiz(description, name, type?.value, image)
        if(res && res.EC===0){
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
        } else {
            toast.error(res.EM)
        }
    }
    
  return (
    <div className='quiz-container'>
        <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
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
                                <input type="text" className="form-control" placeholder="Enter Quiz Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                />
                                <label>Description</label>
                            </div>
                            <div className='my-3'>
                                <Select
                                    defaultValue={type}
                                    onChange={setType}
                                    options={options}
                                    placeholder='Quiz Type'
                                />
                            </div>
                            <div className='more-actions form-group'>                    
                                <label className='form-label'>Upload Image</label>
                                <input type='file' className='form-control'
                                    onChange={(e) => handleChangeFile(e)}
                                >
                                </input>
                            </div>
                            <div className='col-md-12 img-preview'>
                                {previewImage ? 
                                    <img height='300px' width='300px' alt='' src={previewImage}></img>
                                    :
                                    <span>Preview Image</span>
                                }
                                
                                {/* <img src='https://bit.ly/eric-bot-2' alt=''></img> */}
                                {/* <img></img> */}
                            </div>
                            <div className='mt-3'>
                                <button className='btn btn-warning' onClick={() => handleSubmitQuiz()}>Save</button>
                            </div>
                        </fieldset>
                    </div>
                    </Accordion.Body>
            </Accordion.Item>
        </Accordion>
        <div className='list-detail'>
            <TableQuiz />
        </div>
    </div>
  )
}

export default ManageQuiz