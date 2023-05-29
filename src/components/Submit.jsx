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
      navigate("/sucesso", {
        state: { date, seats, name, cpf, movie, session },
      });
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Nome do Comprador:</Label>
      <Input
        data-test="client-name"
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Digite seu nome..."
        required
      />
      <Label htmlFor="cpf">CPF do Comprador:</Label>
      <Input
        data-test="client-cpf"
        type="text"
        id="cpf"
        value={cpf}
        max={11}
        onChange={(e) => setCpf(e.target.value)}
        placeholder="Digite seu CPF..."
        required
      />
      <ReservarBtn data-test="book-seat-btn" type="submit">
        Reservar Assento(s)
      </ReservarBtn>
    </FormContainer>
  );
}

const Label = styled.label`
  margin-top: 7px;
`;
const Input = styled.input`
  width: 327px;
  height: 51px;
  background: #ffffff;
  border: 1px solid #d5d5d5;
  border-radius: 3px;

  font-family: "Roboto";
  font-style: italic;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #afafaf;

  padding-left: 18px;
`;

const ReservarBtn = styled.button`
  font-family: "Roboto";
  color: white;
  font-size: 18px;
  background-color: #e8833a;
  border: none;
  width: 225px;
  height: 42px;
  margin-top: 57px;
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
    margin-top: 57px;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
