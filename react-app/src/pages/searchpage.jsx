import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchResults from "../components/SearchResults"


const Results = () => {
    return (
      <div className='container'>
        <Navbar/>
        <SearchResults/>
        <Footer/>
      </div>
    )
  }

  export default Results