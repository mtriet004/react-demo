import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { LuImagePlus } from "react-icons/lu";
import { toast } from 'react-toastify';
import { updateUser } from '../../../service/APIService';
import _ from 'lodash'
const ModalUpdateUser = (props) => {    
  const {show, setShow, dataUpdate} = props  

//   const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    setEmail('')
    setPassword('')
    setUsername('')
    setRole('USER')
    setImage('')
    setPreviewImage('')
    props.setDataUpdate({})
  };
//   const handleShow = () => setShow(true);
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('USER')
  const [image, setImage] = useState('')
  const [previewImage, setPreviewImage] = useState('')

  useEffect(() =>{
    if(!_.isEmpty(dataUpdate)){
        //update state
        setEmail(dataUpdate.email)
        // setPassword(dataUpdate.password)
        setUsername(dataUpdate.username)
        setRole(dataUpdate.role)
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
    const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    };

  const handleSubmitCreateUser = async() =>{
    //validate
    const isValidEmail = validateEmail(email)
    if(!isValidEmail){
      toast.error('invalid email!')
      return
    } 

    let data = await updateUser(dataUpdate.id, username, role, image)
    console.log('component res: ', data)
    // console.log('check res', data)
    if(data && data.EC === 0){
      toast.success(data.EM)
      handleClose()

      await props.fetchListUserWithPaginate(props.currentPage)
    }
    
    if (data && data.EC !==0){
      toast.error(data.EM)
    }
  }
  // console.log('check data update', props.dataUpdate)
  return (
    <>

      <Modal
        className='modal-add-user'
        show={show}
        onHide={handleClose}
        size='xl'
        backdrop='static' //chỉ đóng khi nhấn x hoặc close
        >
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className="row g-3">
            <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={email} disabled
                    onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Password</label>
                <input type="password" className="form-control" value={password} disabled
                    onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="col-md-6">
                <label className="form-label">Username</label>
                <input type="text" className="form-control" value={username}
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="col-md-4">
                <label  className="form-label">Role</label>
                <select className="form-select" onChange={(e) => setRole(e.target.value)}>
                    <option value='USER'>USER</option>
                    <option value='ADMIN'>ADMIN</option>
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
            <div className='col-md-12 img-preview'>
                {previewImage ? 
                    <img alt='' src={previewImage}></img>
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
          <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUpdateUser