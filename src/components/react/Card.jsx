const Card = ({ title, description }) => {
  return (
    <article className="card-item">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
};

export default Card;
