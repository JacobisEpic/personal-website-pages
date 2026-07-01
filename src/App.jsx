import herobg from "./assets/herobg.png";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works } from "./components";

const App = () => {
  return (
    <div className='relative z-0 bg-white'>
      <div
        className='bg-cover bg-no-repeat bg-center'
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <Navbar />
        <Hero />
      </div>
      <About />
      <Experience />
      {/* <Tech /> */}
      <Works />
      {/* <Feedbacks /> */}
      <Contact />
    </div>
  );
}

export default App;
