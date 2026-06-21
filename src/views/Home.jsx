import { useMemo } from "react";
import useVinos from "../hooks/useVinos";
import HeroSection from "../components/home/HeroSection";
import DestacadosSection from "../components/home/DestacadosSection";
import HistoriaBanner from "../components/home/HistoriaBanner";
import ServiciosSection from "../components/home/ServiciosSection";
import EstadoCarga from "../components/shared/EstadoCarga";

const Home = () => {
  const { vinos, cargando, error } = useVinos();
  const destacados = useMemo(() => vinos.filter((p) => p.discountPercent > 0).slice(0, 3), [vinos]);

  return (
    <div>
      <HeroSection />
      <EstadoCarga cargando={cargando} error={error}>
        <DestacadosSection destacados={destacados} />
      </EstadoCarga>
      <HistoriaBanner />
      <ServiciosSection />
    </div>
  );
};

export default Home;
