import React, { useEffect, useState } from 'react'
import { viewHistory } from '../../service/APIService'
import moment from 'moment'

const ViewHistory = () => {

    const [history, setHistory] = useState([])

    useEffect(() =>{
        fetchData()
    },[])

    const fetchData = async () =>{
        let res = await viewHistory()
        if(res && res.EC ===0){
            let newData = res?.DT?.data?.map((item) =>{
                return {
                    id: item.id,
                    quiz_name: item.quizHistory.name,
                    total_questions: item.total_questions,
                    total_correct: item.total_correct,
                    date: moment(item.createdAt).utc().format('DD/MM/YYYY hh:mm:ss A')
                }
            })
            if(newData.length > 7){
                newData = newData.slice(newData.length - 7, newData.length)
            }
            setHistory(newData)
        }
    }

  return (
    <div>
        <table className='table table-bordered table-striped table-hovered'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Quiz Name</th>
                    <th>Total Questions</th>
                    <th>Total Correct Answer</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {history && history.length > 0 &&
                history.map((item, index) =>{
                    return(
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.quiz_name}</td>
                            <td>{item.total_questions}</td>
                            <td>{item.total_correct}</td>
                            <td>{item.date}</td>
                        </tr>
                    )
                   
                })

                }
            </tbody>
        </table>
    </div>
  )
}

export default ViewHistory