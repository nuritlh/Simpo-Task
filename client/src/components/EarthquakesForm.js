import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { getEarthquakes } from '../services/routes';
import { getMaxMagnitude, getMinMagnitude, getMedian } from '../services/utils';
import InputForm from './InputForm';
import backgroundImage from '../image/earthquak.jpg';

const EarthquakeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-image: url(${backgroundImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
`;

const FormLineWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;`;

const SecondTitle = styled.span`
  font-weight: 600;
  width: 80px;
`;

const ResultsTitle = styled.p`
  font-size: 1.4rem;
`;

const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  display: block;
`;

const ResultsWrapper = styled.div`
  text-align: center;
`;

const EarthquakesForm = () => {
  const [formQuery, setFormQuery] = useState({
    startDate: "2002-08-20",
    endDate: "2020-08-20",
    magnitude: 4,
    latitude: 40,
    longitude: 100,
    radius: 123,
  });
  const [totalEarthquakes, setTotalEarthquakes] = useState(0);
  const [maxMagnitude, setMaxMagnitude] = useState(0);
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [median, setMedian] = useState(0);
  const [magnitudeError, setMagnitudeError] = useState('');
  const [latitudeError, setLatitudeError] = useState('');
  const [longitudeError, setLongitudeError] = useState('');
  const [isNoResults, setIsNoResults] = useState(false);

  const handleOnChaneInput = useCallback((e) => {
    //check values on top of min-max values
    if(e.target.name === "magnitude" && (e.target.value <0 || e.target.value > 10)) {
      setMagnitudeError('value can be between 0 to 10');
      return false;
    }
    if(e.target.name === "latitude" && (e.target.value < -90 || e.target.value > 90)) {
      setLatitudeError('value can be between -90 to 90');
      return false;
    }
    if(e.target.name === "longitude" && (e.target.value < -180 || e.target.value > 180)) {
      setLongitudeError('value can be between -90 to 90');
      return false;
    }
    formQuery[e.target.name] = e.target.value;
    setFormQuery(formQuery);
  },[formQuery]);

  const handleSubmit = () => {
    getEarthquakes(formQuery).then((res) => {
      const earthquakes = res.features;
      const totalEarthquakes = (earthquakes && earthquakes.length) ? earthquakes.length : 0;
      if(totalEarthquakes > 0) {
        setTotalEarthquakes(totalEarthquakes);
        setIsNoResults(false);
        setResultsToDisplay(earthquakes);
      }
      else {
        setTotalEarthquakes(0);
        setIsNoResults(true)
      }
    });
  };

  const setResultsToDisplay = (data) => {
    const maxMagnitude = getMaxMagnitude(data);
    setMaxMagnitude(maxMagnitude);
    const minMagnitude = getMinMagnitude(data);
    setMinMagnitude(minMagnitude);
    const median = getMedian(data);
    setMedian(median);
  };

  return (
      <EarthquakeWrapper>
        <Title>Earthquake Catalog</Title>
        <BodyWrapper>
          <FormLineWrapper>
            <SecondTitle>Start Date</SecondTitle>
            <InputForm
              type="date"
              name="startDate"
              value={formQuery.startDate}
              defaultValue={formQuery.startDate}
              handleOnChaneInput={handleOnChaneInput}
            />
            <SecondTitle>End Date</SecondTitle>
            <InputForm
              type="date"
              name="endDate"
              value={formQuery.endDate}
              defaultValue={formQuery.endDate}
              handleOnChaneInput={handleOnChaneInput}
            />
          </FormLineWrapper>
          <FormLineWrapper>
            <div>
              <SecondTitle>Min magnitude</SecondTitle>
              <InputForm
                type="number"
                name="magnitude"
                value={formQuery.magnitude}
                defaultValue={formQuery.magnitude}
                min="0"
                max="10"
                error={magnitudeError}
                width="200"
                handleOnChaneInput={handleOnChaneInput}
              />
              <SecondTitle>Latitude</SecondTitle>
              <InputForm
                type="number"
                name="latitude"
                value={formQuery.latitude}
                defaultValue={formQuery.latitude}
                min="-90"
                max="90"
                error={latitudeError}
                handleOnChaneInput={handleOnChaneInput}
              />
              <SecondTitle>Longitude</SecondTitle>
              <InputForm
                type="number"
                name="longitude"
                value={formQuery.longitude}
                defaultValue={formQuery.longitude}
                min="-180"
                max="180"
                error={longitudeError}
                handleOnChaneInput={handleOnChaneInput}
              />
              <SecondTitle>Radius</SecondTitle>
              <InputForm
                type="number"
                name="radius"
                value={formQuery.radius}
                defaultValue={formQuery.radius}
                handleOnChaneInput={handleOnChaneInput}
                min="0"
                max="10"
                placeholder="km"
              />
            </div>
          </FormLineWrapper>
        </BodyWrapper>
        <div><Button onClick={handleSubmit}>Get your Earthquakes!</Button></div>
        {totalEarthquakes > 0 &&
        <ResultsWrapper>
          <Title>Results</Title>
          <ResultsTitle>Total Earthquakes: {totalEarthquakes}</ResultsTitle>
          <ResultsTitle>Max Magnitude: {maxMagnitude}</ResultsTitle>
          <ResultsTitle>Min Magnitude: {minMagnitude}</ResultsTitle>
          <ResultsTitle>Median: {median}</ResultsTitle>
        </ResultsWrapper>}
        {isNoResults && <ResultsTitle>no Results Found</ResultsTitle>}
      </EarthquakeWrapper>
  )
};

export default EarthquakesForm;