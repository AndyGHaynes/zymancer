import React from 'react';
import PropTypes from 'prop-types';
import DefinedTypes from '../../DefinedTypes';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import s from './SliderInput.css';

class SliderInput extends React.PureComponent {
  static propTypes = {
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    update: PropTypes.func.isRequired,
    children: PropTypes.element,
    sliderStyle: PropTypes.object,
    sliderWidth: PropTypes.string,
    inputWidth: PropTypes.string,
    step: PropTypes.number,
    disabled: PropTypes.bool
  };

  render() {
    let {
      value, min, max,
      update,
      children,
      sliderStyle = {},
      sliderWidth = '4-5',
      inputWidth = '1-5',
      step = 1,
      disabled = false
    } = this.props;

    value = typeof value === 'string' ? parseFloat(value) : value;
    const sliderContainer = `pure-u-${sliderWidth}`;
    const inputContainer = `pure-u-${inputWidth}`;
    const input = children ? children : (
      <TextField
        name="slider-input"
        className={s.input}
        value={value}
        onChange={(e) => update(e.target.value)}
        disabled={disabled || value === null}
      />
    );

    if (value > max) {
      value = max;
    } else if (value < min) {
      value = min;
    }

    // warnings are annoying, just fudge this for equal values
    if (min === max) {
      min -= step;
      max += step;
    }

    return (
      <div className={s.sliderInput}>
        <div className={sliderContainer} style={sliderStyle}>
          <Slider
            className={s.slider}
            value={value}
            min={min} max={max} step={step}
            onChange={(e, v) => update(v)}
            disabled={disabled || value === null}
            disableFocusRipple
          />
        </div>
        <div className={inputContainer}>
          {input}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SliderInput);