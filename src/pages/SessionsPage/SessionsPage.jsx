import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SessionsPage() {
  const [movie, setMovie] = useState([]);
  const [days, setDays] = useState([]);

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
      console.log(response.data.days[0].showtimes);
    });
  }, []);

  return (
    <PageContainer>
      <p>Selecione o horário</p>
      <div>
        <SessionContainer>
          {days.map((day) => (
            <div data-test="movie-day" key={day.id}>
              <p>{day.weekday}</p>
              <p>{day.date}</p>
              <ButtonsContainer>
                {day.showtimes.map((time) => (
                  <Link
                    data-test="showtime"
                    key={time.id}
                    to={`/assentos/${time.id}`}>
                    <Btn>{time.name}</Btn>
                  </Link>
                ))}
              </ButtonsContainer>
            </div>
          ))}
        </SessionContainer>
      </div>
      <FooterContainer data-test="footer">
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

const Btn = styled.button`
  width: 83px;
  height: 43px;

  background: #e8833a;
  border-radius: 3px;
  border: none;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  letter-spacing: 0.02em;

  color: #ffffff;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;

  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
  > p {
    margin-left: 60px;
  }
  @media screen and (max-width: 1024px) {
    text-align: center;
    > p {
      margin: 0;
    }
  }
`;
const SessionContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 5%;
  align-items: flex-start;
  margin: 0 60px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    gap: 0;
    margin: 0;
    p {
      text-align: start;
    }
  }
  font-family: "Roboto";
  font-size: 20px;
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
  background-color: #e8833a;
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
