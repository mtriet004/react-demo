import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { updateQuiz } from '../../../../service/APIService'
import { toast } from 'react-toastify'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";

const ModalEditQuiz = (props) => {

  const { show, setShow, dataUpdate , fetchQuiz,setDataUpdate } = props
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  // Reset state and close modal
  const handleClose = () => {
    setName('')
    setDescription('')
    setType('')
    setImage('')
    setPreviewImage('')
    setShow(false)
    setDataUpdate({})
  }

  // Initialize modal with data from props (when editing quiz)
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setName(dataUpdate.name)
      setDescription(dataUpdate.description)
      setType(dataUpdate.difficulty)
      setImage('')
      if (dataUpdate.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
      } else {
        setPreviewImage('')
      }
    }
    }, [dataUpdate])
  
  

  // Handle image upload and preview
  const handleUploadImage = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0])) // Update preview image
      setImage(e.target.files[0]) // Update image file
    }
  }
  
  

  // Submit edited quiz
  const handleSubmitEditQuiz = async () => {
    let data = await updateQuiz(dataUpdate.id,name, description, type, image)
    if (data && data.EC === 0) {
      toast.success(data.EM)
      await fetchQuiz()
      console.log('check data',data)
      handleClose()
    } else {
      toast.error(data.EM)
    }
  }

  return (
    <>
      <Modal
        className='modal-edit-quiz'
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static'
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" value={name}
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Description</label>
              <input type="text" className="form-control" value={description}
                onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="col-md-12">
              <label className="form-label">Difficulty</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value='EASY'>Easy</option>
                <option value='MEDIUM'>Medium</option>
                <option value='HARD'>Hard</option>
              </select>
            </div>
            <div className='col-md-12'>
              <label className='form-label label-upload' htmlFor='labelUpload' style={{ cursor: 'pointer' }}>
                Upload File Image <LuImagePlus />
              </label>
              <input type='file' id='labelUpload' hidden
                onChange={(e) => handleUploadImage(e)}
              />
            </div>
            <div className='col-md-12 img-preview '>
              {previewImage ?
                <img alt='' src={previewImage} style={{ width: '300px', height: '300px' }} />
                :
                <span>Preview Image</span>
              }
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
    </>
  )
}

export default ModalEditQuiz
