import { useMemo } from "react";
import useVinos from "../hooks/useVinos";
import HeroSection from "../components/home/HeroSection";
import DestacadosSection from "../components/home/DestacadosSection";
import HistoriaBanner from "../components/home/HistoriaBanner";
import ServiciosSection from "../components/home/ServiciosSection";

const Home = () => {
  const { vinos } = useVinos();
  const destacados = useMemo(() => vinos.filter((p) => p.discountPercent > 0).slice(0, 3), [vinos]);

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
