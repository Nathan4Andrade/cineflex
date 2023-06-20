import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const request = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );

    request.then((response) => {
      setMovies(response.data);
      console.log(response.data);
    });
  }, []);

  if (movies === null) {
    return (
      <PageContainer>
        <ListContainer>
          <Imagem>
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </Imagem>
        </ListContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {movies.map((movie) => (
          <Link data-test="movie" key={movie.id} to={`/sessoes/${movie.id}`}>
            <MovieContainer>
              <img src={`${movie.posterURL}`} />
              <p>{movie.title}</p>
            </MovieContainer>
          </Link>
        ))}
      </ListContainer>
    </PageContainer>
  );
}

const Imagem = styled.div`
  margin: 0 auto;
  margin-top: 100px;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  margin-top: 30px;
  padding-top: 70px;
  a {
    text-decoration: none;
    color: #ffffff;
  }
`;
const ListContainer = styled.div`
  /*   width: 330px; */
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;
const MovieContainer = styled.div`
  width: 145px;
  height: 210px;
  /* box-shadow: 0px 2px 4px 2px #0000001a; */
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 10px;
  img {
    width: 130px;
    height: 190px;
  }
  > p {
    text-decoration: none;
    margin-top: 5px;
    font-size: 10px;
  }
`;
