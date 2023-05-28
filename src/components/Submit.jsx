/* eslint-disable react/prop-types */
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function Submit(props) {
  const { selected, date, movie, session } = props;
  console.log(props);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const ids = selected.map((seat) => seat.id);
  const seats = selected.map((seat) => seat.name);

  const dataToSubmit = {
    ids: ids,
    name: name,
    cpf: cpf,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataToSubmit);
    const promise = axios.post(
      `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`,
      dataToSubmit
    );

    promise.then(() => {
      navigate("/", {
        state: { date, seats, name, cpf, movie, session },
      });
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <label htmlFor="name">Nome do Comprador:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome..."
        required
      />
      <label htmlFor="cpf">CPF do Comprador:</label>
      <input
        type="text"
        id="cpf"
        value={cpf}
        max={11}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF..."
        required
      />
      <ReservarBtn type="submit">Reservar Assento(s)</ReservarBtn>
    </FormContainer>
  );
}

const ReservarBtn = styled.button`
  font-family: "Roboto";
  color: white;
  font-size: 18px;
  background-color: #e8833a;
  border: none;
  width: 225px;
  height: 42px;
`;

const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
    margin: auto;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
