import CarouselMUI from "./component/carousel/CarouselMUI.jsx";
import Service from "./component/Service/Service.jsx";
import About from "./component/about/About.jsx";
import Header from "../../component/header/Header.jsx";
import Footer from "../../component/footer/Footer.jsx";

const HomePage = () => {

  return (<main style={{
      width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column",
    }}>
      <Header/>
      <div style={{
        flex: '1 1 0%',
    }}>
      
        <CarouselMUI/>
        <Service/>
        <About/>
      </div>
    <Footer />
    </main>);
}
export default HomePage
