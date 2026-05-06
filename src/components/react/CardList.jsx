import Card from "./Card";

const cards = [
  { id: 1, title: "HTML", description: "Estructura del sitio" },
  { id: 2, title: "CSS", description: "Estilos y dise\u00f1o visual" },
  { id: 3, title: "JavaScript", description: "L\u00f3gica e interactividad" },
];

const CardList = () => {
  return (
    <section>
      <h2>Tecnolog\u00edas</h2>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} title={card.title} description={card.description} />
        ))}
      </div>
    </section>
  );
};

export default CardList;
