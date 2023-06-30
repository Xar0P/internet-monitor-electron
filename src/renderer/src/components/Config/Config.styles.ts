import styled from 'styled-components'

export const Container = styled.div`
  padding-top: 50px;
`

export const Limits = styled.div`
  display: flex;
  padding: 10px 0;
`

export const LimitsContent = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const SetLimits = styled.form`
  width: 50%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  div {
    display: flex;
    flex-direction: column;
    gap: 5px;

    input {
      height: 30px;
      width: 50px;
      border-radius: 8px;
      text-align: center;
    }
  }

  input[type='submit'] {
    width: 150px;
    height: 30px;
    border-radius: 8px;
    cursor: pointer;
  }
`
