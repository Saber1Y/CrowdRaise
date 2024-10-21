import "./App.css";
import CardList from "./constants/CardList";
import Distribute from "./constants/Distribute";
import Donations from "./constants/Donations";
import FilterList from "./constants/FilterList";
import Footer from "./constants/Footer";
import Hero from "./constants/Hero";

function App() {
  return (
    <>
      <Hero />
      <Donations />
      <FilterList />
      <CardList />
      <Distribute />
      <Footer />
    </>
  );
}

export default App;
