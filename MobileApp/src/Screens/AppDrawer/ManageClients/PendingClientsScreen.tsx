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

export const PendingClientsScreen = () => {
  const {session}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));
  const [CurrentInvitationId, setCurrentInvitationId] = useState('');
  const [CurrentInvitationFullName, setCurrentInvitationFullName] =
    useState('');
  const [PendingClientsList, setPendingClientsList] = useState([]);
  const [RefreshingPendingCliients, setRefreshingPendingCliients] =
    React.useState(false);
  const [showRemoveInviteAlertDialog, setShowRemoveInviteAlertDialog] =
    React.useState(false);
  const onRefreshPendingClients = React.useCallback(() => {
    setRefreshingPendingCliients(true);

    setTimeout(() => {
      GetPendingClients(auth.GetBusinessId());
    }, 2000);
    setRefreshingPendingCliients(false);
  }, []);
  const RemoveInvitation = async (invitationId: string) => {
    await DeleteUserInvitation(invitationId, 2, (error: any) => {
      if (error) {
        setRefreshingPendingCliients(false);
        console.error(error.response.data);
      } else {
        GetPendingClients(auth.GetBusinessId());
        setRefreshingPendingCliients(false);
      }
    });
  };

  const GetPendingClients = async (businessId: string) => {
    return await GetInvitationsByBusinessIdUserRole(
      businessId,
      '2',
      (error: any, result: any) => {
        if (error) {
          console.error(error.response.data);
        } else {
          setPendingClientsList(result.data);
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
      GetPendingClients(auth.GetBusinessId());
    }
  }, [session]);
  return (
    <View style={{flex: 1}}>
      {PendingClientsList[0] ? (
        <FlatList
          data={PendingClientsList}
          extraData={PendingClientsList}
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
              refreshing={RefreshingPendingCliients}
              onRefresh={onRefreshPendingClients}
            />
          }
        />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={RefreshingPendingCliients}
              onRefresh={onRefreshPendingClients}
            />
          }>
          <Text>You currently have no pending driver invitations.</Text>
        </ScrollView>
      )}
      <RemoveAlert />
    </View>
  );
};
