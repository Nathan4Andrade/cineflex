import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

export default function SuccessPage() {
  const { date, seats, name, cpf, movie, session } = useLocation().state;

  const format = (cpf) => {
    if (cpf && cpf.length === 11) {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
    return cpf;
  };

  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>

      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{movie}</p>
        <p>
          {date} - {session}
        </p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {seats.map((seat) => (
          <p key={seat}>Assento {seat}</p>
        ))}
      </TextContainer>

      <TextContainer data-test="client-info">
        <strong>
          <p>Comprador</p>
        </strong>
        <p>Nome: {name}</p>
        <p>CPF: {format(cpf)}</p>
      </TextContainer>

      <Link data-test="go-home-btn" to="/">
        <Btn data-test="go-home-btn">Voltar para Home</Btn>
      </Link>
    </PageContainer>
  );
}

const Btn = styled.button`
  width: 225px;
  height: 42px;
  background: #e8833a;
  border-radius: 3px;
  border: none;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.04em;

  color: #ffffff;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
  }
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;
const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;
