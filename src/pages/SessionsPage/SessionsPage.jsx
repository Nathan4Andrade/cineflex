import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SessionsPage() {
  const [movie, setMovie] = useState([]);
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);

  const { idFilme } = useParams();
  console.log(idFilme);

  useEffect(() => {
    const request = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`
    );
    request.then((response) => {
      setMovie(response.data);
      setDays(response.data.days);
      console.log(response.data.days);
      setTimes(response.data.days.showtimes);
      console.log(response.data.days[0].showtimes);
    });
  }, []);

  return (
    <PageContainer>
      Selecione o horário
      <div>
        <SessionContainer>
          {days.map((day) => (
            <div key={day.id}>
              <p>
                {day.weekday} - {day.date}
              </p>
              <ButtonsContainer>
                {day.showtimes.map((hour) => (
                  <Link key={hour.id} to={`/assentos/${hour.id}`}>
                    <button>{hour.name}</button>
                  </Link>
                ))}
              </ButtonsContainer>
            </div>
          ))}
        </SessionContainer>
      </div>
      <FooterContainer>
        <div>
          <img src={movie.posterURL} alt="poster" />
        </div>
        <div>
          <p>{movie.title}</p>
        </div>
      </FooterContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
  }
  a {
    text-decoration: none;
  }
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
