import { connect } from 'react-redux';
import Navigation from '../components/Navigation'

const mapStateToProps = (state) => ({
  userLoggedIn: state.userLoggedIn
});

const NavigationContainer = connect(
  mapStateToProps
)(Navigation);

export default NavigationContainer;