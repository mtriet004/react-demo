import React, { useEffect } from 'react'
import { useState } from 'react'
import _ from 'lodash'
import { updateQuiz } from '../../../../service/APIService'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";

const ModalEditQuiz = (props) => {

  const {show, setShow, dataUpdate, options, fetchQuiz} =props
  const [name,setName] = useState('')
  const [description,setDescription] = useState('')
  const [type, setType] = useState('')
  const [image, setImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)

  const handleClose = () =>{
    setName('')
    setDescription('')
    setType('')
    setImage('')
    setPreviewImage('')
    setShow(false)
    props.setDataUpdate({})
  }
  
 
  useEffect(() =>{
    if(!_.isEmpty(dataUpdate)){
      setName(dataUpdate.name)
      setDescription(dataUpdate.description)
      setType(dataUpdate.difficulty)
      setImage('')
      if(dataUpdate.image){
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
      }
    }
  },[dataUpdate])


  const handleUploadImage = (e) =>{
    if(e.target && e.target.files && e.target.files[0]){
        setPreviewImage(URL.createObjectURL(e.target.files[0])) //hàm cực căng
        setImage(e.target.files[0])
    } 
  }

  const handleSubmitEditQuiz = async () =>{
    let data = await updateQuiz(dataUpdate.id, description, name, type, image)
    console.log('check data', data)
    if(data && data.EC ===0){
      toast.success(data.EM)
      handleClose()
      await fetchQuiz()
    } else {
      toast.error(data.EM)
    }
  }

  return (
    <div>
      <Modal
        className='modal-edit-quiz'
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static' //chỉ đóng khi nhấn x hoặc close
        >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                {/* {console.log('check name', name)} */}
                <label className="form-label">Name</label>
                <input type="text" className="form-control" value={name}
                    onChange={(e) => setName(e.target.value)}/>
                {/* {console.log('check name after input', name)} */}
            </div>
            <div className="col-md-6">
                <label className="form-label">Description</label>
                <input type="text" className="form-control" value={description}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>
            <div className="col-md-12">
                <label  className="form-label">Difficulty</label>
                <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value='EASY'>Easy</option>
                    <option value='MEDIUM'>Medium</option>
                    <option value='HARD'>Hard</option>
                </select>
            </div>
            <div className='col-md-12'>
                <label className='form-label label-upload' htmlFor='labelUpload'>
                    Upload File Image <LuImagePlus />
                </label>
                <input type='file' id='labelUpload' hidden
                onChange={(e) => handleUploadImage(e)}
                ></input>
            </div>
            <div className='col-md-12 img-preview '>
                {previewImage ? 
                    <img alt='' src={previewImage} style={{width: '300px', height:'300px'}}></img>
                    :
                    <span>Preview Image</span>
                }
                
                {/* <img src='https://bit.ly/eric-bot-2' alt=''></img> */}
                {/* <img></img> */}
            </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmitEditQuiz()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ModalEditQuiz