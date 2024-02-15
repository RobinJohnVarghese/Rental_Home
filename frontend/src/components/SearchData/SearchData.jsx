
import { Link } from 'react-router-dom';
import "./SearchData.css";
import { useLocation } from 'react-router-dom';

function SearchData() {
    const { state } = useLocation();
    console.log("^^^^^^^^^^  state",state)
    const searchResults = Array.isArray(state) ? state : [];
    console.log("^^^^^^^^^^  searchResults",searchResults)

  
  return (
    <div id="residencies" className="r-wrapper">
      <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
      <div className="paddings innerWidth r-container">
        {searchResults && searchResults.map((card, i) => (
            <Link to={`/residencies/detail/${card.slug}`} className="r-card-link">
              {console.log("card.slug",card.slug)}
              <div className="flexColStart r-card">
                <img src={card.photo_main} alt="home" />
  
                <span className="secondaryText r-price">
                  <span style={{ color: 'orange' }}>₹</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.address}</span>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchData;