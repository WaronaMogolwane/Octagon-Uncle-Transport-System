import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
} from 'react-native';

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
  Modal,
  ModalBackdrop,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from '@gluestack-ui/themed';
import {Auth} from '../../../Classes/Auth';
import {GetUser} from '../../../Controllers/UserController';
import {AuthContext} from '../../../Services/AuthenticationService';
import {
  RestoreImageViaAsyncStorage,
  ClearImageViaAsyncStorage,
} from '../../../Services/ImageStorageService';
import {
  ProfileScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';
import {SettingsCard} from '../../../Components/Cards/SettingsCard';
import {CustomButton1} from '../../../Components/Buttons';

const ProfileScreen = ({navigation}: any) => {
  const {signOut, session}: any = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const ref = React.useRef(null);

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
          </ModalBody>
          <ModalFooter>
            <View style={{flex: 1}}>
              <CustomButton1
                styles={{marginTop: 10}}
                title="Sign out"
                size="md"
                action="negative"
                isDisabled={false}
                isFocusVisible={false}
                onPress={async () => {
                  ClearImageViaAsyncStorage().then(async () => {
                    await signOut();
                  });
                }}
              />
            </View>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={ThemeStyles.container}>
      {SignOutModal()}
      <View>
        <Text style={ProfileScreenStyles.headingText}>Settings</Text>
      </View>

      <SettingsCard
        Title={'Account'}
        Description={'Update your account settings'}
        HandleOnPress={() => navigation.navigate('Edit User Account')}
      />

      <SettingsCard
        Title={'Personal Information'}
        Description={'Edit or view personal information'}
        HandleOnPress={() => navigation.navigate('Edit User Details')}
      />

      <SettingsCard
        Title={'Business Information'}
        Description={'Edit or view business information'}
        HandleOnPress={() => navigation.navigate('Edit Business Details')}
      />

      <CustomButton1
        styles={ProfileScreenStyles.button}
        title="Sign Out"
        size="md"
        action={undefined}
        isDisabled={false}
        isFocusVisible={false}
        onPress={() => setShowModal(true)}
      />
    </SafeAreaView>
  );
};

export default ProfileScreen;
