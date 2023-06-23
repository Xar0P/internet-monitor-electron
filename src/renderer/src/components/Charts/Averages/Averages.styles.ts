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

  > div {
    display: flex;
    align-items: center;
    justify-content: center;

    width: 80%;
    height: 50px;
  }

  & > div:nth-of-type(1) {
    background-color: #974b62;
    border: 3px solid #ff6384;
  }

  & > div:nth-of-type(2) {
    background-color: #326a96;
    border: 3px solid #35a2eb;
  }

  & > div:nth-of-type(3) {
    background-color: #495da0;
    border: 3px solid #636dff;
  }
`
