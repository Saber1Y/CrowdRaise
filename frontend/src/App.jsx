import "./App.css";
import CardList from "./constants/CardList";
import Distribute from "./constants/Distribute";
import Donations from "./constants/Donations";
import Footer from "./constants/Footer";
import GroupImg from "./constants/GroupImg";
import Hero from "./constants/Hero";

function App() {
  return (
    <>
      <Hero />
      <Donations />
      <CardList />
      <Distribute />
      <GroupImg />
      <Footer />
    </>
  );
}

export default App;
