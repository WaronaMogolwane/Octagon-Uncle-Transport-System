import {StyleSheet, View} from 'react-native';
import COLORS from '../Const/colors';

export const ThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  logo: {
    marginBottom: 32,
  },
});
export const FormStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    // width: 250,
  },
  logo: {
    marginBottom: 32,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: COLORS.grey,
  },
  inputContainer: {
    height: 55,
    backgroundColor: COLORS.light,
    flexDirection: 'row',
    paddingHorizontal: 15,
    borderWidth: 0.5,
    alignItems: 'center',
  },
});
export const FlatlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f0f3',
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
  pickedUp: {
    color: COLORS.darkBlue,
    fontWeight: 'bold',
  },
  dropOffBox: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: '100%',
  },
  pickUpBox: {
    backgroundColor: COLORS.darkBlue,
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
export const AssignPassengerScreenStyles = StyleSheet.create({
  container: {
    backgroundColor: '#e8f0f3',
    padding: 16,
  },
  dropdown: {
    backgroundColor: '#fff',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
export const PassengerListActiveCardStyles = StyleSheet.create({
  activeText: {
    fontWeight: 'bold',
    color: COLORS.green,
    marginStart: 5,
  },
  inactiveText: {
    fontWeight: 'bold',
    color: COLORS.red,
    marginStart: 5,
  },
});
export const ManagePassengerScreenStyles = StyleSheet.create({
  flatList: {
    backgroundColor: '#ffffff',
  },
  tabBarStyle: {
    backgroundColor: '#ffffff',
    // elevation: 10,
  },
  tabBarIndicatorStyle: {
    backgroundColor: 'black',
  },
  tabBarContentContainerStyle: {},
  searchBox: {
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f2f3f5',
  },
  parentButton: {
    marginTop: 10,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'grey',
  },
  editPassengerModalButton: {
    marginTop: 10,
    marginEnd: 5,
  },
  deletePassengerModalButton: {
    marginTop: 10,
    marginStart: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    width: '100%',
  },
  deletePassengerReasonModalButton: {
    width: '100%',
    marginTop: 25,
  },
});
export const EditUserDetailsScreenStyles = StyleSheet.create({
  container: {
    marginHorizontal: 17,
  },
  smallRowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export const AppDrawerScreenStyles = StyleSheet.create({
  header: {
    backgroundColor: '#20B2AA',
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },

  image: {
    width: 40,
    height: 40,
  },

  body: {
    padding: 30,
  },
  box: {
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: '#20B2AA',
    fontSize: 22,
    alignSelf: 'center',
    marginLeft: 10,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  coverPhoto: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 75,
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  toolbarContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
  },
  toolbarLeftContainer: {marginVertical: 15, marginStart: 15},
  toolbarRightContainer: {marginVertical: 15, marginEnd: 15},
  toolbarText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.customBlack,
  },
});
export const EditUserAccountScreenStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  form: {
    marginHorizontal: 17,
  },
  smallRowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  label: {
    marginTop: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#1E90FF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  avatarContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  changeAvatarButton: {
    marginTop: 10,
  },
  changeAvatarButtonText: {
    color: '#1E90FF',
    fontSize: 15,
    marginBottom: 25,
  },
  modalText: {
    marginBottom: 10,
  },
  fabPosition: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    marginTop: 20,
  },
});
export const EditBusinessDetailScreenStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 17,
  },
  body: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 0.16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
  nameContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
    marginRight: 8,
  },
  infoText: {
    fontSize: 16,
  },
  smallContainer: {alignItems: 'flex-start'},
});
export const ProfileScreenStyles = StyleSheet.create({
  image: {width: 40, height: 40},
  headingText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.customBlack,

    marginStart: 14,
    marginBottom: 15,
  },
  button: {marginTop: 50, marginHorizontal: 16, backgroundColor: '#98a7b5'},
});
export const SettingCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5,
    marginHorizontal: 14,
    height: 50,
  },
  descriptionText: {
    color: '#4c7488',
  },
  titleText: {
    color: COLORS.customBlack,

    fontWeight: '600',
    fontSize: 17,
  },
  smallCardDivision: {
    width: '10%',
    marginTop: 5,
  },
  largeCardDivision: {width: '90%'},
});
export const PassengerListAllCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  passengerName: {
    color: COLORS.customBlack,

    fontSize: 16,
    fontWeight: '500',
  },
  passengerAddress: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  statusIndicatorActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  statusIndicatorNotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
export const PendingPassengerListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  passengerName: {
    color: COLORS.customBlack,

    fontSize: 16,
    fontWeight: '500',
  },
  parentName: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  deleteReason: {
    fontSize: 14,
    color: 'gray',
  },
  statusIndicatorActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  statusIndicatorNotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
export const PassengerParentCardListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  passengerName: {
    color: COLORS.customBlack,

    fontSize: 16,
    fontWeight: '500',
  },
  parentName: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  deleteReason: {
    fontSize: 14,
    color: 'red',
  },
  statusIndicatorActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
  },
  statusIndicatorNotActive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
});
export const LinkedVehicleListCardListCardStyles = StyleSheet.create({
  vehicleItem: {
    // flexDirection: 'row',
    // backgroundColor: 'white',
    // borderRadius: 10,
    // padding: 15,
    // marginBottom: 15,
    // shadowColor: '#000', // Add shadow
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3, // For Android shadow
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
    padding: 5,
  },
  vehicleImage: {
    width: 60,
    height: 75,
    borderRadius: 8,
    marginRight: 15,
  },
  vehicleInfo: {
    flex: 1,
    justifyContent: 'center', // Vertically center text
  },
  vehicleTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.customBlack,
  },
  driverText: {
    color: COLORS.customBlue,
    fontSize: 14,
  },
});
export const ManageTripsScreenStyles = StyleSheet.create({
  searchBox: {
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f2f3f5',
  },
  flatlistStyle: {backgroundColor: '#ffffff'},
  emptyFlatlistText: {backgroundColor: '#ffffff', marginHorizontal: 5},
});
