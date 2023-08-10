import styled from "styled-components";

export const randomImageUrls = ["/img/post-it1.png", "/img/post-it2.png", "/img/post-it3.png", "/img/post-it4.png", "/img/post-it5.png"];

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem 0 0;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Form = styled.form`
  width: 33%;
  min-width: 375px;
  display: flex;
`;

export const TextInput = styled.input`
  width: 85%;
  height: 3rem;
  padding: 0.5rem;
  border: none;
  border-radius: 0.2rem;
  margin-right: 15px;

  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;

export const SubmitInput = styled.input`
  width: 25%;
  height: 3rem;
  border: none;
  border-radius: 0.2rem;

  color: #ffffff;
  background-color: #5a75aa;
  font-size: 1.2rem;
`;

export const UnorderdList = styled.ul`
  display: flex;
  flex-wrap: wrap; /* 줄바꿈 설정 */
  width: 73%;
  min-width: 375px;
  padding: 0;

  list-style-type: none;

  > * {
    width: 30%;
  }
`;

export const ListItem = styled.li`
  height: 250px;
  padding: 1.575rem;
  margin: 0.5rem;
  background: ${(props) => (props.backgroundimage ? `url(${props.backgroundImage}) center/contain no-repeat` : "none")};
  background-size: 80% 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  &:before {
    content: "";
    display: ${(props) => props.tododone};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: url("/img/success.png") no-repeat center/cover;
  }
`;

export const TodoText = styled.span`
  display: inline-block;
  width: 90%;
  font-size: 1.2rem;
  line-height: 1.5rem;
  text-align: center;
  line-height: 30px;
`;

export const TodoDelete = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 0.5rem;
  right: 0;
  top: -1%;
  background: url("/img/trash-can.png") no-repeat center/cover;
  z-index: 100;

  position: absolute;
`;
