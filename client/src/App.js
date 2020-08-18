import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import EarthquakesForm from './components/EarthquakesForm';
import ReactLoading from 'react-loading';
import app from './App.css';

const AppWrapper = styled.div`
  height: 100%;
`;

const BodyWrapper = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const App = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetch('http://localhost:1234/')
      .then(response => response.json())
      .then(data => {
        setTimeout(function(){ setIsReady(true) }, 1000);
      });
  });

    return (
      <AppWrapper>
        {isReady
          ? <BodyWrapper>
            <EarthquakesForm />
          </BodyWrapper>
          : <BodyWrapper>
            <ReactLoading type="cylon" color="#111111" height={367} width={275} />
          </BodyWrapper>
        }
      </AppWrapper>
    )
};

export default App;
