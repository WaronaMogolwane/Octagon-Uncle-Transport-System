import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';
import {
  FlatList,
  Button,
  Text,
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogCloseButton,
  ButtonText,
  Heading,
  Icon,
  ButtonGroup,
  CloseIcon,
  ScrollView,
} from '@gluestack-ui/themed';
import {
  AuthContext,
  DeleteUserInvitation,
  GetInvitationsByBusinessIdUserRole,
} from '../../../Services/AuthenticationService';
import {PendingDriverListCard} from '../../../Components/Cards/DriverListCard';
import {Auth} from '../../../Classes/Auth';

export const PendingDriverscreen = () => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [CurrentInvitationId, setCurrentInvitationId] = useState('');
  const [CurrentInvitationFullName, setCurrentInvitationFullName] =
    useState('');
  const [PendingDriversList, setPendingDriversList] = useState([]);
  const [refreshingPendingDrivers, setRefreshingPendingDrivers] =
    useState(false);
  const [showRemoveInviteAlertDialog, setShowRemoveInviteAlertDialog] =
    useState(false);
  const onRefreshPendingDrivers = React.useCallback(() => {
    setRefreshingPendingDrivers(true);

    setTimeout(() => {
      try {
        GetPendingDrivers(auth.GetBusinessId());
      } catch (error) {
        console.error(error);
      }
    }, 2000);
    setRefreshingPendingDrivers(false);
  }, []);
  const RemoveInvitation = async (invitationId: string) => {
    await DeleteUserInvitation(invitationId, 2, (error: any) => {
      if (error) {
        setRefreshingPendingDrivers(false);
        console.error(error.response.data);
      } else {
        GetPendingDrivers(auth.GetBusinessId());
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
      GetPendingDrivers(auth.GetBusinessId());
    }
  }, [session]);
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
