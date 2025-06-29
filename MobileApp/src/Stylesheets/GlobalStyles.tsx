import {StyleSheet} from 'react-native';
import COLORS from '../Const/colors';

export const ThemeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  customLabelFont: {fontSize: 15, fontWeight: '500', color: COLORS.customBlack},
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
    backgroundColor: '#ffffff',
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 30,
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
  titleText: {
    textAlign: 'left',
    marginStart: 20,
    fontSize: 19.5,
    fontWeight: 'bold',
    color: COLORS.customBlack,
    marginBottom: 30,
  },
  secondTitleText: {
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'left',
    color: COLORS.customBlack,
    marginStart: 20,
  },
  thirdTitleText: {
    color: COLORS.customBlue,
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'left',
    marginStart: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  button: {
    width: '45%',
    marginBottom: 30,
  },
  flatListText: {textAlign: 'center', marginTop: 5},
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
    justifyContent: 'center',
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
    color: COLORS.customBlue,
    // color: '#1E90FF',
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
  searchInputContainer: {
    flexDirection: 'row',
    height: 45,
    backgroundColor: '#f2f3f5',
    marginHorizontal: 14,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
  },
  flatList: {backgroundColor: '#ffffff'},
  emptyFlatlistText: {backgroundColor: '#ffffff', marginHorizontal: 5},
});
export const HomeScreenStyles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 10,
  },
  primaryHeading: {
    marginStart: 20,
    fontSize: 28,
    fontWeight: '500',
    color: COLORS.customBlack,
  },
  secondaryHeading: {marginStart: 100},
  titleText: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.customBlack,
    // marginBottom: 5,
  },
  secondTitleText: {
    marginTop: 27,
    textAlign: 'left',
    marginStart: 20,
    marginBottom: 20,
  },
  flatList: {
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 10,
    height: '50%',
  },
  emptyFlatListText: {
    textAlign: 'center',
    color: COLORS.customBlue,
    fontWeight: '400',
  },
  piesChartTitle: {
    textAlign: 'center',
    color: COLORS.customBlue,
    fontWeight: '400',
  },
  vehicleContainer: {
    // justifyContent: 'center', // Center vertically
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 1,
    height: '100%',
    marginHorizontal: 10,
    padding: 10,
  },
  vehicleImage: {
    marginEnd: 15,
    width: 110,
    height: '100%',
    borderRadius: 8,
    marginRight: 15,
  },
  itemContainer: {
    flexDirection: 'row',
  },
  itemPrimaryText: {color: COLORS.customBlack, fontWeight: '500'},
  itemSecondaryText: {color: COLORS.customBlue, fontWeight: '500'},
  vehicleInfo: {justifyContent: 'space-evenly'},
  chartContainer: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    paddingTop: 10,
  },
  legend: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
    marginBottom: 5,
  },
});
export const SmallHomeScreenCardStyles = StyleSheet.create({
  cardContainer: {
    alignItems: 'center', // Center horizontally
    justifyContent: 'center', // Center vertically
    borderRadius: 20,
    borderWidth: 1,
    width: '45%',
    height: 75,
  },
  primaryText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.customBlack,
  },
  secondaryText: {
    fontSize: 14,
    color: COLORS.customBlue,
  },
});
export const StatRowCardStyles = StyleSheet.create({
  statsContainer: {
    marginBottom: 20, // Space above the bottom nav
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginHorizontal: 20,
  },
  statLabel: {
    fontSize: 16,
    color: COLORS.customBlack,
    fontWeight: '500',
  },
  statValues: {
    flexDirection: 'row',
  },
  statValue: {
    fontSize: 16,
    // fontWeight: 'bold',
    marginRight: 2,
  },
  statTotal: {
    fontSize: 16,
    color: 'grey',
  },
});
export const PassengerListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    marginHorizontal: 14,
  },
  passengerImage: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginEnd: 15,
    backgroundColor: '#f2f3f5',
    width: 90,
    height: 90,
    borderRadius: 40,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  passengerName: {
    color: COLORS.customBlack,
    fontSize: 15,
    fontWeight: '400',
  },
  parentName: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  age: {
    color: COLORS.customBlue,
    fontSize: 15,
    fontWeight: '400',
  },
  scheduledText: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.green,
  },
  notScheduledText: {
    fontWeight: '500',
    fontSize: 14,
    color: COLORS.customRed,
  },
});
export const TripScreenStyles = StyleSheet.create({
  flatListText: {textAlign: 'center', marginTop: 10},
  modalText: {
    fontSize: 16,
    color: COLORS.customBlack,
    fontWeight: '500',
    marginVertical: 10,
  },
  modalContainer: {alignItems: 'center', flex: 1},
});
export const TripCardDriverSwipableCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f5efe8',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  passengerName: {fontWeight: '500', fontSize: 16, color: COLORS.customBlack},
  pickupDate: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  timeContainer: {
    justifyContent: 'center',
  },
  tripStatusText: {fontWeight: '400', fontSize: 14},
});
export const TripCardParentCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f5efe8',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  passengerName: {fontWeight: '500', fontSize: 16, color: COLORS.customBlack},
  pickupDate: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  timeContainer: {
    marginTop: 1,
  },
  tripStatusText: {fontWeight: '400', fontSize: 14},
});
export const TripTransporterCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  iconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#f5efe8',
    borderRadius: 10,
    borderWidth: 1,
    marginVertical: 10,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'space-between',
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  passengerName: {fontWeight: '500', fontSize: 16, color: COLORS.customBlack},
  pickupDate: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  timeContainer: {
    justifyContent: 'flex-start',
  },
  tripStatusText: {fontWeight: '400', fontSize: 14},
  modalText: {
    fontSize: 16,
    color: COLORS.customBlack,
    fontWeight: '500',
    marginVertical: 10,
  },
  modalContainer: {alignItems: 'center', flex: 1},
  emptyFlatListText: {textAlign: 'center'},
});
export const SignInScreenStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginHorizontal: 50,
  },
  image: {
    marginBottom: 35,
    marginTop: 80,
    height: 100,
    width: '100%',
  },
  loginText: {
    textAlign: 'center',
    marginBottom: 13,
    fontWeight: '500',
    color: COLORS.customBlack,
    fontSize: 26,
  },
});
export const SelectUserRoleScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginHorizontal: 20,
  },
});
export const SelectUserRoleFormStyles = StyleSheet.create({
  loginText: {
    textAlign: 'left',
    marginBottom: 13,
    fontWeight: '500',
    color: COLORS.customBlack,
    fontSize: 20,
  },
});
export const AuthenticationStackStyles = StyleSheet.create({
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
export const SignUpScreenStyles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 17,
  },
});
export const PersonalDetailsScreenStyles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 17,
  },
});
export const BusinessDetailsScreenStyles = StyleSheet.create({
  container: {
    marginTop: 15,
    marginHorizontal: 17,
  },
});
export const ClientListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  clientName: {
    color: COLORS.customBlack,
    fontSize: 16,
    fontWeight: '500',
  },
  passengerCount: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  clientEmail: {
    fontSize: 14,
    color: COLORS.customBlue,

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
export const PendingDriverListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  clientName: {
    color: COLORS.customBlack,
    fontSize: 16,
    fontWeight: '500',
  },
  passengerCount: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  clientEmail: {
    marginBottom: 10,
    fontSize: 14,
    color: COLORS.customBlue,

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
export const DriverListCardStyles = StyleSheet.create({
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10.5,
    marginHorizontal: 14,
  },
  passengerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  parentInfo: {
    flex: 1,
  },
  clientName: {
    color: COLORS.customBlack,
    fontSize: 16,
    fontWeight: '500',
  },
  passengerCount: {
    fontSize: 14,
    color: COLORS.customBlack,

    fontWeight: '400',
  },
  clientEmail: {
    fontSize: 14,
    color: COLORS.customBlue,

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
export const VehicleListCardStyles = StyleSheet.create({
  vehicleItem: {
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
  licenseNumber: {
    color: COLORS.customBlue,
    fontSize: 14,
  },
  driverName: {
    color: COLORS.customBlack,
    fontSize: 14,
  },
});
export const ForgotPasswordScreenStyles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginHorizontal: 20,
  },
});
export const TripCardStyles = StyleSheet.create({
  passengerList: {
    marginBottom: 20,
  },
  passengerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginHorizontal: 11,
  },
  passengerInfo: {
    flex: 1,
  },
  passengerName: {fontWeight: '500', fontSize: 16, color: COLORS.customBlack},
  pickupTime: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  dropOffTime: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  driverName: {fontWeight: '400', fontSize: 14, color: COLORS.customBlue},
  timeContainer: {
    justifyContent: 'flex-start',
  },
});
export const GroupedFlatListStyles = StyleSheet.create({
  header: {
    padding: 16,
    // backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerText: {
    fontWeight: '400',
    fontSize: 18,
    color: COLORS.customBlack,
  },
  currentDateHeader: {
    padding: 16,
    backgroundColor: COLORS.white,
    color: COLORS.customBlack,
    fontSize: 16,
    fontWeight: '400',
  },
  recordItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  groupHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
    backgroundColor: COLORS.white,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
  },
  groupHeaderText: {
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.customBlack,
  },
  container: {backgroundColor: COLORS.white},
});
