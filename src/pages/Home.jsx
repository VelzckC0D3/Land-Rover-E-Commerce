import '../assets/style/Home.css'
import { useNavigate } from 'react-router-dom';
import { AiOutlineRightCircle } from 'react-icons/ai';

const Home = () => {
  const navigate = useNavigate();
  return (
    <>

    <div className="homeCont">
      <h2 className='homeTitle'>LAND ROVER</h2>
      <button className='actionBtn' onClick={() => navigate('/vehicles')}>Learn More <AiOutlineRightCircle /> </button>
    </div>
    </>
  )
}

export default Home