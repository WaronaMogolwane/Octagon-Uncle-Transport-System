import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CustomButton1} from '../../Components/Buttons';
import {ThemeStyles} from '../../Stylesheets/GlobalStyles';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import {ProfileCard} from '../../Components/Cards/ProfleCard';
import {AuthContext} from '../../Services/AuthenticationService';
import {Auth} from '../../Classes/Auth';
import {
  Banknote,
  BookUser,
  BriefcaseBusiness,
  LogOut,
  User,
} from 'lucide-react-native';
import {
  ArrowLeftIcon,
  Button,
  ButtonIcon,
  ButtonText,
  CloseIcon,
  Heading,
  Icon,
  Image,
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
  TrashIcon,
} from '@gluestack-ui/themed';
import {GetUser} from '../../Controllers/UserController';

const ProfileScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [showModal, setShowModal] = useState(false);

  const iconSize = 50;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const ref = React.useRef(null);

  const userId = auth.GetUserId();
  const role: number = Number(auth.GetUserRole());

  const user = {
    avatar: 'https://www.bootdey.com/img/Content/avatar/avatar1.png',
    coverPhoto:
      'https://www.tarkett-asia.com/media/img/M/THH_25094221_25187221_001.jpg',
    name: 'John Smith',
  };

  useEffect(() => {
    GetUserName();
  }, []);

  const iconSelector = (id: number) => {
    if (id == 1) {
      return (
        <View>
          <User
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
            style={styles.image}
          />
        </View>
      );
    } else if (id == 2) {
      return (
        <View>
          <BookUser
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
            style={styles.image}
          />
        </View>
      );
    } else if (id == 3) {
      return (
        <View>
          <Banknote
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
            style={styles.image}
          />
        </View>
      );
    } else if (id == 4) {
      return (
        <View>
          <BriefcaseBusiness
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
            style={styles.image}
          />
        </View>
      );
    }
  };

  const GetUserName = async () => {
    GetUser(userId)
      .then((result: any) => {
        setFirstName(result.firstName);
        setLastName(result.lastName);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const SignOutModal = () => {
    return (
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        finalFocusRef={ref}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Heading size="lg">Sign out</Heading>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <View>
              <Text>Are you sure you want to sign out?</Text>
            </View>
            <View style={{marginTop: 15}}></View>
          </ModalBody>
          <ModalFooter>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{padding: 5}}>
                <Button
                  size="md"
                  variant="solid"
                  action="secondary"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <ButtonIcon as={ArrowLeftIcon} />
                  <ButtonText>Back</ButtonText>
                </Button>
              </View>
              <View style={{padding: 5}}>
                <Button
                  size="md"
                  variant="solid"
                  action="negative"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={async () => {
                    await signOut();
                  }}>
                  <LogOut
                    size={26}
                    strokeWidth={iconStrokeWidth}
                    color={'#FFFFFF'}
                    style={styles.image}
                  />
                  <ButtonText>Sign Out</ButtonText>
                </Button>
              </View>
            </View>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View>
            <View>
              <Image
                style={styles.coverPhoto}
                alt="profile photo"
                source={require('../../Images/background_image.jpg')}
              />
            </View>
            <View style={styles.avatarContainer}>
              <Image
                alt="profile photo"
                source={{uri: user.avatar}}
                style={styles.avatar}
              />
              <Text style={styles.name}>{firstName + ' ' + lastName}</Text>
            </View>
          </View>

          <View style={styles.body}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit User Account');
              }}>
              <View style={styles.box}>
                <View>{iconSelector(1)}</View>

                <Text style={styles.username}>Account</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit User Details');
              }}>
              <View style={styles.box}>
                <View>{iconSelector(2)}</View>

                <Text style={styles.username}>Personal</Text>
              </View>
            </TouchableOpacity>
            {role == 2 ? (
              <TouchableOpacity
                onPress={() => {
                  //navigation.navigate('Edit Payment Details');
                }}>
                <View style={styles.box}>
                  <View>{iconSelector(3)}</View>

                  <Text style={styles.username}>Payments</Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Edit Business Details');
              }}>
              <View style={styles.box}>
                <View>{iconSelector(4)}</View>

                <Text style={styles.username}>Business</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View>{SignOutModal()}</View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <View style={{padding: 5}}>
                <Button
                  size="md"
                  variant="solid"
                  action="negative"
                  isDisabled={false}
                  isFocusVisible={false}
                  onPress={() => {
                    setShowModal(true);
                  }}>
                  <LogOut
                    size={26}
                    strokeWidth={iconStrokeWidth}
                    color={'#FFFFFF'}
                    style={styles.image}
                  />
                  <ButtonText>Sign Out</ButtonText>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    height: 130,
    resizeMode: 'cover',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -75,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: 'white',
  },
  name: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default ProfileScreen;
