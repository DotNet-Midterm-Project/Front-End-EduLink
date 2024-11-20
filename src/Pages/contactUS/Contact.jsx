// src/pages/contact/contact.js
import ContactInfo from '../../Components/contact/ContactInfo';
import ContactForm from '../../Components/contact/ContactForm';

// import Footer from '../Footer';
// import Header from '../Header';

export default function Contact() {
  return (
    <div>
      
      { <ContactInfo /> }
      {<ContactForm/>}
      {/* <Footer /> */}
    </div>
  );
}
