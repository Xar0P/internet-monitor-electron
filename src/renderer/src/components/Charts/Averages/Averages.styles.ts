import styled from 'styled-components'

export const Container = styled.div`
  width: 25%;
  padding: 20px 0 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  font-size: 40px;
  color: #fff;

  & > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80%;
    height: 50px;
  }

  & > div:nth-of-type(1) {
    background-color: rgba(96, 171, 154, 0.5);
    border: 3px solid rgb(96, 171, 154);
  }

  & > div:nth-of-type(2) {
    background-color: rgba(53, 162, 235, 0.5);
    border: 3px solid rgb(53, 162, 235);
  }

  & > div:nth-of-type(3) {
    background-color: rgba(222, 222, 224, 0.5);
    border: 3px solid rgb(222, 222, 224);
  }
`
