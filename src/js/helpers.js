class Helpers {
  /**
   * get derivative data from initial data
   * @param {Array} data
   * @param  {string} entity
   * @return {Array}
   */
  getEntities(data, entity) {
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
  }

  /**
   * get different colors for pie charts
   * @param  {number} i
   * @return {string}
   */
  getColor(i) {
    return `hsl(${i * 65}, 75%, 50%)`;
  }

  /**
   * get window width
   * @return {number}
   */
  getWindowWidth() {
    return window.innerWidth;
  }

  /**
   * set chart height
   * @param {number} breakpoint
   * @return {number}
   */
  setHeight(breakpoint) {
    const MIN_HEIGHT = 320;
    const MAX_HEIGHT = 400;
    return this.getWindowWidth() < breakpoint
      ? MIN_HEIGHT
      : MAX_HEIGHT;
  }

  /**
   * set chart width
   * @param {number} breakpoint
   * @param {HTMLElement} selector
   * @return {number}
   */
  setWidth(breakpoint, selector) {
    const MIN_WIDTH = 768;
    return this.getWindowWidth() < breakpoint
      ? MIN_WIDTH
      : parseInt(selector.style('width'), 10);
  }

  /**
   * set chart dimensions
   * @param {HTMLElement} selector
   * @return {Object}
   */
  setChartDimensions(selector) {
    const WIDTH_BREAKPOINT = 768;
    const HEIGHT_BREAKPOINT = 1024;

    // need margins for axis
    const MARGIN = {
      top: 20,
      right: 0,
      bottom: 30,
      left: 40,
    };

    const width = this.setWidth(WIDTH_BREAKPOINT, selector);
    const height = this.setHeight(HEIGHT_BREAKPOINT);
    const innerWidth = width - MARGIN.left - MARGIN.right;
    const innerHeight = height - MARGIN.top - MARGIN.bottom;

    return {
      width,
      height,
      innerWidth,
      innerHeight,
      margin: MARGIN,
    };
  }

  /**
   * check if country had World Cup
   * @param  {Array} data
   * @param  {Object} country
   * @return {boolean}
   */
  didCountryHaveWorldCup(data, country) {
    const worldCupCountries = data.map(item => item.country);
    return (
      worldCupCountries.indexOf(country) !== -1 ||
      country === 'Japan'|| country === 'South Korea'
    );
  }

  /**
   * get years of World Cup in defined country
   * @param  {Array} data
   * @param  {Object} country
   * @return {Array}
   */
  getWorldCupYears(data, country) {
    const years = [];
    data.forEach(item => {
      if ((item.country === country) ||
          (item.country === 'Corea/Japan' && country === 'Japan' ||
           item.country === 'Corea/Japan' && country === 'South Korea')) {
        years.push(item.year);
      }
    });
    return years;
  }

  /**
   * throttle function for resize optimisation
   * @param  {Function} callback
   * @param  {number} delay
   * @return {Function}
   */
  throttle(callback, delay) {
    let timeout;
    return () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        callback();
      }, delay);
    };
  }
}

export default new Helpers();
