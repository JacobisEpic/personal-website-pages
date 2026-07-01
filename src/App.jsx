import herobg from "./assets/herobg.png";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

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
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </div>
  );
}

export default App;
