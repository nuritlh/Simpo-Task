export const getMaxMagnitude = (data) => {
  return Math.max.apply(Math, data.map(item => { return item.properties.mag; }))
};

export const getMinMagnitude = (data) => {
  return Math.min.apply(Math, data.map(item => { return item.properties.mag; }))
};

export const getMedian = (data) => {
  const medianInd = Math.ceil((data.length + 1)/2);
  return data[medianInd].properties.mag;
};

export default {
  getMaxMagnitude,
  getMinMagnitude,
  getMedian
}