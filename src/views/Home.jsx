import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVinos } from "../redux/slices/vinosSlice";
import HeroSection from "../components/home/HeroSection";
import DestacadosSection from "../components/home/DestacadosSection";
import HistoriaBanner from "../components/home/HistoriaBanner";
import ServiciosSection from "../components/home/ServiciosSection";

const Home = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.vinos);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchVinos());
  }, [dispatch]);

  const destacados = useMemo(
    () => items.filter((p) => p.discountPercent > 0).slice(0, 3),
    [items]
  );

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
