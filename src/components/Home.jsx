import "../assets/style/Home.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineRightCircle } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .swiper-pagination {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
          bottom: 2rem !important;
          padding: 0 1rem;
        }

        .navButton{
          filter: brightness(0) invert(1);
        }

        .btnActive {
          transform: rotate(360deg);
          -webkit-transform: rotate(360deg);
          filter: brightness(1) invert(0);
        }
      
        .swiper-slide-active {
          transition: opacity 1s ease-in-out !important;
        }
      
        @media (min-width: 900px) {
          .navButton {
            display: block
          }
        
          .navCont {
            transition: transform 0.5s ease-in-out, box-shadow 1s ease-in-out;
          }
        }
    `}</style>
      <div className="homeSwiperCont"></div>
      <Swiper
      className="homeSwiper"
        direction="horizontal"
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        slidesPerView={1}
        allowTouchMove={false}
        loop={true}
        pagination={{
          clickable: true
        }}
      >
        <SwiperSlide>
          <div className="homeCont home1">
            <div className="homeCta">
              <h2 className="homeTitle">LAND ROVER</h2>
              <h3 className="homeSub">DEFENDER</h3>
              <button
                className="actionBtn"
                onClick={() => navigate("/vehicles")}
              >
                Learn More <AiOutlineRightCircle />{" "}
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="homeCont home2">
            <div className="homeCta">
              <h2 className="homeTitle">LAND ROVER</h2>
              <h3 className="homeSub">DISCOVERY</h3>
              <button
                className="actionBtn"
                onClick={() => navigate("/vehicles")}
              >
                Learn More <AiOutlineRightCircle />{" "}
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="homeCont home3">
            <div className="homeCta">
              <h2 className="homeTitle">LAND ROVER</h2>
              <h3 className="homeSub">RANGE ROVER</h3>
              <button
                className="actionBtn"
                onClick={() => navigate("/vehicles")}
              >
                Learn More <AiOutlineRightCircle />{" "}
              </button>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="homeCont home4">
            <div className="homeCta">
              <h2 className="homeTitle">LAND ROVER</h2>
              <h3 className="homeSub">RANGE ROVER VELAR</h3>
              <button
                className="actionBtn"
                onClick={() => navigate("/vehicles")}
              >
                Learn More <AiOutlineRightCircle />{" "}
              </button>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

    </>
  );
};

export default Home;
