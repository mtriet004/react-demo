import React from 'react'
import { useState, useEffect } from 'react'
import { getAllQuizForAdmin } from '../../../../service/APIService'
import ModalDeleteQuiz from './ModalDeleteQuiz';
import ModalEditQuiz from './ModalEditQuiz'
const TableQuiz = (props) => {

    const [isShowModalDelete, setIsShowModalDelete] = useState(false)
    const [isShowModalEdit, setIsShowModalEdit] = useState(false)
    const [dataDelete, setDataDelete] = useState({})
    const [dataUpdate, setDataUpdate] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    useEffect(() =>{
        fetchQuiz()
    }, [])

    const fetchQuiz =  async () =>{
        setDataDelete({})
        setDataUpdate({})
        let res = await getAllQuizForAdmin();
        if(res && res.EC ===0){
            setListQuiz(res.DT)
        }
    }

    const handleDeleteBtn = (quiz) =>{
        setIsShowModalDelete(true)
        setDataDelete(quiz)
    }

    const handleEditBtn = (quiz) =>{
        setIsShowModalEdit(true)
        setDataUpdate(quiz)
    }

  return (
    <>
        <div><b>List Quizzes: </b></div>
        <table className="table table-hover table-bordered my-2">
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
                {listQuiz && listQuiz.map((item, index) => {
                    return (
                        <tr key={`table-quiz-${index}`}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td style={{display: 'flex', gap: '15px'}}>
                                <button className='btn btn-warning' onClick={() => handleEditBtn(item)}>Edit</button>
                                <button className='btn btn-danger' onClick={() => handleDeleteBtn(item)}>Delete</button>
                            </td>
                        </tr>
                    )
                })
                    
                }
            </tbody>
        </table>
        <ModalDeleteQuiz
            show = {isShowModalDelete}
            setShow = {setIsShowModalDelete}
            dataDelete = {dataDelete}
            fetchQuiz= {fetchQuiz}
        />
        <ModalEditQuiz 
            show={isShowModalEdit} 
            setShow={setIsShowModalEdit} 
            dataUpdate={dataUpdate}
            setDataUpdate={setDataUpdate} 
            fetchQuiz={fetchQuiz}
        />
  </>
  )
}

export default TableQuiz