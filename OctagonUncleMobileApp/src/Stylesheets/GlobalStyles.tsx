import {StyleSheet, View} from 'react-native';
import COLORS from '../Const/colors';

export const ThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginBottom: 32,
  },
});
export const FormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    width: 250,
  },
  logo: {
    marginBottom: 32,
  },
});
export const FlatlistStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export const TripCardDriverStyles = StyleSheet.create({
  completedTrip: {
    color: COLORS.green,
    fontWeight: 'bold',
  },
  unCompletedTrip: {
    color: COLORS.red,
    fontWeight: 'bold',
  },
  pickUpBox: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  absentBox: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  buttonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  cardContainer: {
    flexDirection: 'row',
    padding: 0,
    textAlign: 'start',
  },
  cardText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardBorder: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 0,
    borderWidth: 0.2,
    margin: 0,
    backgroundColor: '#E5E4E2',
  },
  Text: {
    color: '#000000',
  },
});
export const TripCardParentStyles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    padding: 0,
    textAlign: 'start',
  },
  cardText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardBorder: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 0,
    borderWidth: 0.2,
    margin: 0,
    backgroundColor: '#E5E4E2',
  },
  Text: {
    color: '#000000',
  },
  cardElement: {},
});
