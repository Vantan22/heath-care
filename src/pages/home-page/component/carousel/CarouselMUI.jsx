import Carousel from 'react-material-ui-carousel'
import Item from "./ItemCarousel.jsx";
import BANNER_VALUES from "../../../../constant/BANNER_VALUES";
import './carousel.css'



function CarouselMUI() {

  return (
    <Carousel >
      {
        BANNER_VALUES.map( (item, i) => <Item key={i} item={item} /> )
      }
    </Carousel>
  )
}
export default CarouselMUI
