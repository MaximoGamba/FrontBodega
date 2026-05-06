const MyComponent = ({ name = "Thiago" }) => {
  return (
    <section>
      <h2>Mi componente</h2>
      <p>Hola, {name}. Este es tu proyecto React con componentes reutilizables.</p>
    </section>
  );
};

export default MyComponent;
