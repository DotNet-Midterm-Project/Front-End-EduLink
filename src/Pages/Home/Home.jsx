
import AboutSection from '../../Components/Home/AboutSection'
import OurProcess from '../../Components/Home/OurProcess'
import LatestArticles from '../../Components/Home/LatestArticles'
//import OurState from '../../Components/Home/OurState'
import Footer from '../Footer'
import OurState from '../../Components/Home/OurState'
import Header from '../Header';
import HeroSection from '../../Components/Home/HeroSection'

export default function Home() {
  return (
    <div className=''>

    <Header></Header>
    <HeroSection/> 
      <AboutSection/>
      <OurProcess/>
      <LatestArticles/>
      <OurState/>
      <Footer/>
    </div>
  )
}
