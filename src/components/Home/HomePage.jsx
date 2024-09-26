import React from 'react'
import videoHomePage1 from '../../assets/video-homepage1.mp4'
import { useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  const { t } = useTranslation();

  return (
    <div className='homepage-container'>
        <video autoPlay muted loop>
            <source 
              src={videoHomePage1} 
              type="video/mp4"
            />
          </video>
          <div className='homepage-content'>
              <div className='f-title'>
                {t('homepage.title1')}
              </div>
              <div className='s-title'>
                {t('homepage.title2')}
              </div>
              <div className='t-title'>
                {isAuthenticated === false ?
                  <button onClick={() => navigate('/login')}>Get's started. It's free</button>
                  :
                  <button onClick={() => navigate('/users')}>Do quiz</button>
                }
                  
              </div>
          </div>
      </div>       
  )
}

export default HomePage