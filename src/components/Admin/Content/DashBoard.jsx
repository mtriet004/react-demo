import React, { useEffect, useState } from 'react'
import './Dashboard.scss'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';
import { getOverView } from '../../../service/APIService';
import { useTranslation } from 'react-i18next';

const DashBoard = (props) => {

  const [dataOverview, setDataOverview] = useState([])
  const [dataChart, setDataChart] = useState([])
  const {t} = useTranslation()

  useEffect(() =>{
    fetchDataOverview()
  }, [])

  const fetchDataOverview = async () =>{
    let res = await getOverView()
    if(res && res.EC===0){
      
      setDataOverview(res.DT)

      let Qz = 0, Qs = 0, As = 0
      Qz = res?.DT?.others?.countQuiz ?? 0
      Qs = res?.DT?.others?.countQuestions ?? 0
      As = res?.DT?.others?.countAnswers ?? 0

      const data = [
        {
          "name": t('dashboard.t4'),
          "Qz": Qz
        },
        {
          "name": t('dashboard.t5'),
          "Qs": Qs
        },
        {
          "name": t('dashboard.t6'),
          "As": As
        },
      ]

      setDataChart(data)
    }
  }

  return (
    <div className='dashboard-container'>
      <div className='title'>
        {t('dashboard.title')}
      </div>
      <div className='content'>
        <div className='c-left'>
          <div className='child'>
            <span className='text-1'>{t('dashboard.t1')}</span>
            <span className='text-2'>
              {dataOverview && dataOverview.users

              && dataOverview.users.total ? <>{dataOverview.users.total}</> : <>0</>
              }
            </span>
          </div>
          <div className='child'>
            <span className='text-1'>{t('dashboard.t2')}</span>
            <span className='text-2'>
              {dataOverview && dataOverview.others

              && dataOverview.others.countQuiz ? <>{dataOverview.others.countQuiz}</> : <>0</>
              }
            </span>
          </div>
          <div className='child'>
            <span className='text-1'>{t('dashboard.t7')}</span>
            <span className='text-2'>
              {dataOverview && dataOverview.others

              && dataOverview.others.countQuestions ? <>{dataOverview.others.countQuestions}</> : <>0</>
              }
            </span>
          </div>
          <div className='child'>
            <span className='text-1'>{t('dashboard.t3')}</span>
            <span className='text-2'>
              {dataOverview && dataOverview.others

              && dataOverview.others.countAnswers ? <>{dataOverview.others.countAnswers}</> : <>0</>
              }
            </span>
          </div>
        </div>
        <div className='c-right'>
          <ResponsiveContainer width={'95%'} height={'100%'}>
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" /> 
              <YAxis />
              <Tooltip /> 
              <Legend />  
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#fcb12a" />
            </BarChart>
          </ResponsiveContainer>  
        </div>
      </div>
    </div>
  )
}

export default DashBoard