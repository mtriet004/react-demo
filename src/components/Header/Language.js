import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useTranslation } from 'react-i18next';
import ReactCountryFlag from 'react-country-flag';

const Language = () => {

  const { i18n } = useTranslation();

  const handleChangeLanguage = (language) =>{
    i18n.changeLanguage(language)
  }

  const getFlagCode = (language) => {
    switch (language) {
      case 'en':
        return 'US'; // Mã cờ cho tiếng Anh (English)
      case 'vi':
        return 'VN'; // Mã cờ cho tiếng Việt (Vietnamese)
      default:
        return 'US';
    }
  }

  return (
    <>
      <NavDropdown 
        title={<ReactCountryFlag countryCode={getFlagCode(i18n.language)} svg style={{ width: '1.2em', height: '1.2em' }} />} 
        id="basic-nav-dropdown2" 
        className='languages'
      >
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>
          <ReactCountryFlag countryCode="US" svg style={{ width: '1.5em', height: '1.5em' }} /> English
        </NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>
          <ReactCountryFlag countryCode="VN" svg style={{ width: '1.5em', height: '1.5em' }} /> Việt Nam
        </NavDropdown.Item>
      </NavDropdown>
    </>
  )
}

export default Language;
