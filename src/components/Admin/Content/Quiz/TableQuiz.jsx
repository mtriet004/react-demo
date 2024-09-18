import React from 'react'

const TableQuiz = (props) => {

    const {handleDeleteBtn, handleEditBtn, listQuiz} = props
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
  </>
  )
}

export default TableQuiz