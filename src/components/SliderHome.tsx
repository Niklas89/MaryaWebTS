import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";

const SliderHome = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img2.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img3.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img4.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img5.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img6.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100"
          src="./assets/img/slider/img7.jpg"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default SliderHome;
