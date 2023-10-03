import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineArrowBack } from "react-icons/md";
export default function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  console.log(location.pathname);

  const handleReturn = () => {
    navigate(-1);
  };
  return (
    <NavContainer>
      {location.pathname !== "/" ? (
        <Return onClick={handleReturn}>
          <MdOutlineArrowBack />
        </Return>
      ) : (
        ""
      )}

      <span>CINEFLEX</span>
    </NavContainer>
  );
}

const Return = styled.button`
  position: fixed;
  z-index: 1;
  left: 10px;
  cursor: pointer;
  font-size: 30px;
`;
const NavContainer = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e8833a;
  color: #e5e5e5;
  font-family: "Alatsi", sans-serif;
  font-size: 34px;
  position: fixed;
  top: 0;
  left: 0;
  a {
    text-decoration: none;
    color: #e5e5e5;
  }
`;
