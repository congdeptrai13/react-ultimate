import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const Language = (props) => {
  const { t, i18n } = useTranslation();
  const handleChangleLanguage = (language) => {
    i18n.changeLanguage(language)
    console.log(i18n.language)
  }
  return (
    <>
      <NavDropdown title={i18n.language === "vi" ? "Việt Nam" : "English"} id="basic-nav-dropdown" className='languages'>
        <NavDropdown.Item onClick={() => handleChangleLanguage("en")}>English</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangleLanguage("vi")}>Việt Nam</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}
export default Language;