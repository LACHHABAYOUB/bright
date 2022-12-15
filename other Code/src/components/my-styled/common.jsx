import styled from "styled-components";

export const TitleText = styled.h1`
  font-size: 36px;
  font-weight: 600;
  line-height: 0;
  color: #000000;
`;
export const TitleTextMedium = styled.h2`
  font-size: 20px;
  font-weight: 600;
  line-height: 0;
  color: #000000;
`;
export const AppContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
`;
export const AppContainerFixed = styled.div`
width: 100%;
display: flex;
flex-direction: column; 
align-items: center;
  
`;
export const DataContainer = styled.div`
  width: 90%;
  height: 1050px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
  border: 1px solid;
  padding: 2%;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.5);
`;

export const DataContainerNone = styled.div`
  width: 90%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
  padding: 2%;
  backgroundImage: url(https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350);
  
  backgroundRepeat: 'no-repeat';
`;

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  
`;
export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 25px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.5);
`;

export const MutedLink = styled.a`
  font-size: 12px;
  color: rgba(48, 25, 25, 0.548);
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
`;

export const BoldLink = styled.a`
  font-size: 12px;
  color: rgb(241, 196, 15);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  border: 1px solid rgba(200, 200, 200, 0.3);
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(249, 119, 59);
  background: linear-gradient(
    58deg,
    rgba(249, 119, 59, 1) 20%,
    rgba(255, 200, 0, 1) 100%
  );

  &:hover {
    filter: brightness(1.03);
  }
`;

export const HorizontalRule = styled.hr`
  width: 100%;
  height: 5px;
  border: none;
  background: rgb(249, 119, 59);
  background: linear-gradient(
    58deg,
    rgba(249, 119, 59, 1) 20%,
    rgba(255, 200, 0, 1) 100%
  );
`;
