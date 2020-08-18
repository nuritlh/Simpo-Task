import React, { useState } from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
  margin: 10px;
  `;

const Input = styled.input`
  display: block;
  width: 200px;
  padding: 5px;
`;

const ErrorSpan = styled.span`
  color: #e64141;
  `;

const InputForm = ({ type, name, defaultValue, handleOnChaneInput, placeholder = '', min, max, error = ''}) => {
  const [value, setValue] = useState();

  return (
    <InputWrapper>
      <Input
        type={type}
        name={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        max={max}
        onChange={(e) => {handleOnChaneInput(e)}}
      />
      <ErrorSpan>{error}</ErrorSpan>
    </InputWrapper>
  )
};


export default InputForm;