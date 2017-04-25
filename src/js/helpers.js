class Helpers {
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

  getColor(i) {
    return `hsl(${i * 65}, 75%, 50%)`;
  }

  getWindowWidth() {
    return window.innerWidth;
  }

  setHeight(breakpoint) {
    const MIN_HEIGHT = 320;
    const MAX_HEIGHT = 400;
    return this.getWindowWidth() < breakpoint
      ? MIN_HEIGHT
      : MAX_HEIGHT;
  }

  setWidth(breakpoint, selector) {
    const MIN_WIDTH = 768;
    return this.getWindowWidth() < breakpoint
      ? MIN_WIDTH
      : parseInt(selector.style('width'), 10);
  }

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
