import { useState, useEffect } from "react";
import { fetchVinos } from "../services/api";
import HeroSection from "../components/home/HeroSection";
import DestacadosSection from "../components/home/DestacadosSection";
import HistoriaBanner from "../components/home/HistoriaBanner";
import ServiciosSection from "../components/home/ServiciosSection";

const Home = () => {
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    fetchVinos()
      .then((data) => setDestacados(data.filter((p) => p.discountPercent > 0).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div>
      <HeroSection />
      <DestacadosSection destacados={destacados} />
      <HistoriaBanner />
      <ServiciosSection />
    </div>
  );
};

export default Home;
