import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './HopAddition.css';
import Measurement from '../Measurement';
import _ from 'lodash';
import MeasurementUnits from '../../constants/MeasurementUnits';
import zymath from '../../utils/zymath';
import SliderInput from '../SliderInput';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline';

const HopAddition = ({ addition, hop, originalGravity, boilVolume, setAdditionTime, setAdditionWeight, removeAddition }) => (
  <Paper className={s.hopAddition} zDepth={2}>
    <div className="pure-g">
      <div className="pure-u-11-24">
        <div className={s.additionMinutes}>
          <SliderInput
            value={addition.minutes}
            min={0}
            max={60}
            update={(minutes) => setAdditionTime(addition, hop, minutes)}
          />
        </div>
      </div>
      <div className="pure-u-2-24">
        <div className={s.minuteLabel}>Min</div>
      </div>
      <div className="pure-u-5-24">
        <div className={s.additionWeight}>
          <Measurement
            measurement={addition.weight}
            update={(weight) => setAdditionWeight(addition, hop, weight)}
            options={MeasurementUnits.HopAdditionWeight}
          />
        </div>
      </div>
      <div className="pure-u-5-24">
        <div className="pure-g">
          <div className="pure-u-1-2">
            <div className={s.additionDetail}>
              <div className={s.detailLabel}>IBU</div>
              {_.round(zymath.calculateIBU(addition.weight, addition.minutes, hop.alpha, originalGravity, boilVolume), 1)}
            </div>
          </div>
          <div className="pure-u-1-2">
            <div className={s.additionDetail}>
              <div className={s.detailLabel}>Util</div>
              {_.round(zymath.calculateUtilization(addition.minutes, originalGravity), 2)}
            </div>
          </div>
        </div>
      </div>
      <div className="pure-u-1-24">
        <ContentRemoveCircleOutline
          className={s.removeAddition}
          onClick={() => removeAddition(addition, hop)}
        />
      </div>
    </div>
  </Paper>
);

export default withStyles(s)(HopAddition);