
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const  ModalResult = (props) => {

    const {show, setShow, dataModalResult, handleShowAnswers} = props
    
    const handleClose = () => setShow(false)
  
  return (
    <>

      <Modal show={show} onHide={handleClose} backdrop='static'>
        <Modal.Header closeButton>
          <Modal.Title>Your result: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Total Questions: <b>{dataModalResult.countTotal}</b></div>
          <div>Total correct answers: <b>{dataModalResult.countCorrect}</b></div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {
            handleClose()
            handleShowAnswers()
          }}>
            Show answers
          </Button>
          <Button variant="primary" onClick={() => handleClose()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;