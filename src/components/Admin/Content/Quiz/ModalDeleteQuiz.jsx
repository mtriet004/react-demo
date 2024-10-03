import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { deleteQuiz } from '../../../../service/APIService';
import { toast } from 'react-toastify';
const ModalDeleteQuiz = (props) => {

    const {show, setShow, dataDelete, fetchQuiz} = props

    const handleClose = () =>{
        setShow(false)
    }

    const handleSubmitDeleteQuiz = async () => {
        let data = await deleteQuiz(dataDelete.id)
        if(data && data.EC === 0){
            toast.success(data.EM)
            handleClose()
            await fetchQuiz()
        } else {
            toast.error(data.EM)
        }
    }
  return (
    <div>
        <Modal show={show} onHide={handleClose} backdrop='static'>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete that quiz with id= <b>{dataDelete.id}</b></Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
                Cancel
            </Button>
            <Button variant="primary" onClick={() => handleSubmitDeleteQuiz()}>
                Confirm
            </Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalDeleteQuiz