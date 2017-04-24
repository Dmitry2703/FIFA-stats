export const getEntities = (data, entity) => {
  const entities = data.reduce((result, item) => {
    if (!result[item[entity]]) {
      result[item[entity]] = 0;
    }
    result[item[entity]]++;
    return result;
  }, {});

  const dataForChart = Object.keys(entities).map(key => ({
    entity: key,
    years: data
      .filter(item => item[entity] === key)
      .map(item => item.year),
  }));

  return dataForChart;
};

export const getColor = i => `hsl(${i * 65}, 75%, 50%)`;
