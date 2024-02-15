import React, { useEffect , useState} from 'react'
import { Grid, Paper, Typography } from '@mui/material';
// import { sliderSettings } from "../../utils/common";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";



function AdminHome() {
  const [articles, setArticles] = useState([]);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'https://newsapi.org/v2/everything?' +
          'q=Apple&' +
          'from=2024-02-01&' +
          'sortBy=popularity&' +
          'apiKey=97966ca9479c49ce8522fd179603b55c';

        const response = await fetch(url);
        const data = await response.json();
        setArticles(data.articles);

        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  const handleNextSlide = () => {
    setCurrentArticleIndex((prevIndex) =>
      prevIndex < articles.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevSlide = () => {
    setCurrentArticleIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };




  return (
    <div className='container' style={{margin:'20px'}}>
          <Typography variant="h4" gutterBottom>
            Admin  Dashboard
          </Typography>


          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Global News
            </Typography>
            <div  style={{ height: '300px', backgroundColor: '#e8dada',padding:'5px' }}>
            <Swiper >
              <SlideNextButton onPrev={handlePrevSlide} onNext={handleNextSlide} />
            
              <div key={currentArticleIndex}>
                <div className='headline'><h2>{articles[currentArticleIndex]?.title}</h2></div>
                
                <div className='author'>
                   <h3> Written By : {articles[currentArticleIndex]?.author}</h3>
                </div>
                
                <div className='description'>
                <h4>{articles[currentArticleIndex]?.description}</h4>
                </div>
                
              </div>
               
            </Swiper>


            </div>
          </Paper>

          {/* Details Section */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Total Rentals
                </Typography>
                <Typography variant="h4">100</Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h6" gutterBottom>
                  Average Rent
                </Typography>
                <Typography variant="h4">$1,200</Typography>
              </Paper>
            </Grid>

            {/* Add more details as needed */}
          </Grid>
    </div>
  );
}

export default AdminHome;

// const SlideNextButton = ({ onPrev, onNext }) => {
//   const swiper = useSwiper();
//   return (
//     <div className="flexCenter r-buttons">
//       <button onClick={() => swiper.slidePrev()} className="r-prevButton">
//         &lt;
//       </button>
//       <button onClick={() => swiper.slideNext()} className="r-nextButton">
//         &gt;
//       </button>
//     </div>
//   );
// };

const SlideNextButton = ({ onPrev, onNext }) => {
  return (
    <div className="flexCenter r-buttons">
      <button onClick={onPrev} className="r-prevButton">
        &lt;
      </button>
      <button onClick={onNext} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};