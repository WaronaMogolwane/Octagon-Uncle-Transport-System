import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {
  FlatList,
  Button,
  Text,
  Fab,
  FabIcon,
  AddIcon,
  FabLabel,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
  ButtonText,
  CheckCircleIcon,
  HStack,
  Heading,
  Icon,
  ButtonGroup,
  CloseIcon,
  ScrollView,
} from '@gluestack-ui/themed';
import * as yup from 'yup';
import {useFormik} from 'formik';
import {
  AuthContext,
  DeleteUserInvitation,
  GetInvitationsByBusinessIdUserRole,
} from '../../../Services/AuthenticationService';
import {UserInvitation} from '../../../Models/UserInvitation';
import {PendingDriverListCard} from '../../../Components/Cards/DriverListCard';
import {GetBusinessId} from '../../../Classes/Auth';
import {useStorageState} from '../../../Services/StorageStateService';
// const businessId = 'w8728321-394f-466b-833e-ea9dd60ba000';

export const PendingDriverscreen = () => {
  const {createUserInvitation}: any = useContext(AuthContext);
  const [[tokenIsLoading, authToken], setAuthToken] =
    useStorageState('authToken');
  const {session, isLoading}: any = useContext(AuthContext);
  const [CurrentInvitationId, setCurrentInvitationId] = useState('');
  const [CurrentInvitationFullName, setCurrentInvitationFullName] =
    useState('');
  const [PendingDriversList, setPendingDriversList] = useState([]);
  const [refreshingPendingDrivers, setRefreshingPendingDrivers] =
    React.useState(false);
  const [showAlertDialog, setShowAlertDialog] = React.useState(false);
  const [showRemoveInviteAlertDialog, setShowRemoveInviteAlertDialog] =
    React.useState(false);
  const onRefreshPendingDrivers = React.useCallback(() => {
    setRefreshingPendingDrivers(true);

    setTimeout(() => {
      try {
        GetPendingDrivers(GetBusinessId(session));
        console.log(PendingDriversList);
      } catch (error) {}
    }, 2000);
    setRefreshingPendingDrivers(false);
  }, []);
  const RemoveInvitation = async (invitationId: string) => {
    await DeleteUserInvitation(invitationId, 2, (error: any) => {
      if (error) {
        setRefreshingPendingDrivers(false);
        console.error(error.response.data);
      } else {
        GetPendingDrivers(GetBusinessId(session));
        setRefreshingPendingDrivers(false);
      }
    });
  };

  const GetPendingDrivers = async (businessId: string) => {
    return await GetInvitationsByBusinessIdUserRole(
      businessId,
      '2',
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setPendingDriversList(result.data);
        }
      },
    );
  };
  const RemoveAlert = () => {
    return (
      <AlertDialog
        isOpen={showRemoveInviteAlertDialog}
        onClose={() => {
          setShowRemoveInviteAlertDialog(false);
        }}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Delete invitation</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to delete {CurrentInvitationFullName}'s
              invitation? This invitation will be permanently removed and cannot
              be undone. A new invitation will have to created.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowRemoveInviteAlertDialog(false);
                }}>
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                  RemoveInvitation(CurrentInvitationId);
                  setShowRemoveInviteAlertDialog(false);
                }}>
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  useEffect(() => {
    if (session !== null) {
      GetPendingDrivers(GetBusinessId(session));
    }
  }, [session, PendingDriversList]);
  return (
    <View style={{flex: 1}}>
      {PendingDriversList[0] ? (
        <FlatList
          data={PendingDriversList}
          extraData={PendingDriversList}
          renderItem={({item}: any) => (
            <PendingDriverListCard
              firstName={item.FirstName}
              lastName={item.LastName}
              email={item.Email}
              expiryDate={item.ExpiryDate}
              removeButtonOnPress={() => {
                setCurrentInvitationId;
                setCurrentInvitationId(item.UserInvitationId);
                setCurrentInvitationFullName(
                  item.FirstName + ' ' + item.LastName,
                );
                setShowRemoveInviteAlertDialog(true);
              }}
            />
          )}
          keyExtractor={(item: any) => item.UserInvitationId}
          refreshControl={
            <RefreshControl
              refreshing={refreshingPendingDrivers}
              onRefresh={onRefreshPendingDrivers}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshingPendingDrivers}
              onRefresh={onRefreshPendingDrivers}
            />
          }>
          <Text>You currently have no pending driver invitations.</Text>
        </ScrollView>
      )}
      <RemoveAlert />
    </View>
  );
};
