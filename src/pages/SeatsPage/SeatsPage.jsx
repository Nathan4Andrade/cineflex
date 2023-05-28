import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import axios from "axios";
import Submit from "../../components/Submit";

export default function SeatsPage() {
  const { idSessao } = useParams();
  const [seats, setSeats] = useState([]);
  const [movie, setMovie] = useState([]);
  const [session, setSession] = useState([]);
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    );
    request.then((response) => {
      setMovie(response.data.movie);
      setSession(response.data);
      console.log(response.data);
      setDay(response.data.day.weekday);
      setDate(response.data.day.date);
      setSeats(response.data.seats);
    });
  }, []);

  const selectSeat = (seat) => {
    if (!seat.isAvailable) {
      alert("Assento indisponível");
      return;
    }
    setSelected((oldSelected) => {
      if (oldSelected.some((select) => select.id === seat.id)) {
        return oldSelected.filter((select) => select.id !== seat.id);
      } else {
        return [...oldSelected, seat];
      }
    });
  };

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seats.map((seat) => (
          <SeatItem
            key={seat.id}
            disabled={!seat.isAvailable}
            isAvailable={seat.isAvailable}
            onClick={() => selectSeat(seat)}
            isSelected={selected.some((select) => select.id === seat.id)}>
            {seat.name}
          </SeatItem>
        ))}
      </SeatsContainer>
      <CaptionContainer>
        <CaptionItem>
          <CaptionCircle isSelected={true} />
          Selecionado
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={true} />
          Disponível
        </CaptionItem>
        <CaptionItem>
          <CaptionCircle isAvailable={false} />
          Indisponível
        </CaptionItem>
      </CaptionContainer>
      <Submit
        selected={selected}
        date={date}
        movie={movie.title}
        session={session.name}
      />
      <FooterContainer>
        <div>
          <img src={movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{movie.title}</p>
          <p>
            {day} - {session.name}
          </p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;
const CaptionCircle = styled.div`
  border: ${({ isAvailable }) => (isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${({ isAvailable }) =>
    isAvailable ? "#C3CFD9" : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
const SeatItem = styled.div`
  border: 1px solid
    ${({ isAvailable }) => (isAvailable ? "#7B8B99" : "#F7C52B")};
  background-color: ${({ isAvailable }) =>
    isAvailable ? "#C3CFD9" : "#FBE192"};
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
  ${({ isSelected }) =>
    isSelected &&
    css`
      border: 1px solid #0e7d71;
      background-color: #1aae9e;
    `}
`;
const FooterContainer = styled.div`
  width: 100%;
  height: 120px;
  background-color: #c3cfd9;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 20px;
  position: fixed;
  bottom: 0;

  div:nth-child(1) {
    box-shadow: 0px 2px 4px 2px #0000001a;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 12px;
    img {
      width: 50px;
      height: 70px;
      padding: 8px;
    }
  }

  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
      text-align: left;
      &:nth-child(2) {
        margin-top: 10px;
      }
    }
  }
`;
