import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {VehicleCard} from '../../../Components/Cards/LinkedVehicleListCard';
import {GetVehiclesAndDrivers} from '../../../Controllers/VehicleController';
import {
  useToast,
  Toast,
  VStack,
  ToastDescription,
  ToastTitle,
  FabIcon,
  Fab,
  FabLabel,
  ArrowLeftIcon,
  Menu,
  MenuItem,
  MenuItemLabel,
  AddIcon,
  Divider,
} from '@gluestack-ui/themed';
import {AuthContext} from '../../../Services/AuthenticationService';
import {Auth} from '../../../Classes/Auth';
import {FlatlistStyles} from '../../../Stylesheets/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import filter from 'lodash.filter';
import {CurrentVehicle} from '../../../Models/CurrentVehicle';
import {BookUser, Route} from 'lucide-react-native';
import {set} from 'date-fns';

const ManageTripsScreen = ({navigation}: any) => {
  const {session, isLoading}: any = useContext(AuthContext);
  const [auth, setAuth] = useState(new Auth(session));

  const businessId = auth.GetBusinessId();
  const toast = useToast();

  const [vehicleList, setVehicleList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [noLinkedVehicle, setNoLinkedVehicle] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [showMenu, setShowMenu] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [fullData, setFullData] = useState([]);
  const [selected, setSelected] = React.useState(new Set([]));
  const [curentVehicle, setCurrentVehicle] = useState<CurrentVehicle>();

  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setNoLinkedVehicle(false);

    setTimeout(() => {
      //setRefreshing(true);
      GetLinkedVehicle();
    }, 2000);

    setRefreshing(false);
  }, []);

  useEffect(() => {
    setRefreshing(true);
    GetLinkedVehicle();
  }, []);

  const ShowToast = () => {
    toast.show({
      placement: 'top',
      render: ({id}) => {
        const toastId = 'toast-' + id;
        return (
          <Toast nativeID={toastId} action="attention" variant="solid">
            <VStack space="xs">
              <ToastTitle>Select Vehicle</ToastTitle>
              <ToastDescription>
                Please a select a vehicle to contine.
              </ToastDescription>
            </VStack>
          </Toast>
        );
      },
    });
  };

  const GetLinkedVehicle = async () => {
    await GetVehiclesAndDrivers(businessId)
      .then(result => {
        if (result.length == 0) {
          setNoLinkedVehicle(true);
          setRefreshing(false);
        } else {
          ShowToast();
          setVehicleList(result);
          setRefreshing(false);
          setNoLinkedVehicle(false);
        }
      })
      .catch(() => {
        setRefreshing(false);
      });
  };

  const renderItemComponentVehicleInfo = (itemData: any) => (
    <VehicleCard
      registrationNumber={itemData.licenseNumber}
      make={itemData.make}
      model={itemData.model}
      color={itemData.color}
      fullName={itemData.fullName}
      urlFront={itemData.FrontImageUrl}
      onPress={() => {
        setCurrentVehicle(
          new CurrentVehicle(
            itemData.make,
            itemData.model,
            itemData.color,
            itemData.licenseNumber,
            itemData.vehicleId,
          ),
        );
        setShowMenu(true);
        setIsOpen(true);
      }}
    />
  );

  const EmtpyFlatListText = () => {
    return (
      <View style={{backgroundColor: '#e8f0f3', marginHorizontal: 5}}>
        <Text style={{textAlign: 'center'}}>
          You currently have no linked vehicles. Please add vehicles and try
          again.
        </Text>
      </View>
    );
  };

  const GoBackFab = () => {
    return (
      <Fab
        onPress={() => {
          navigation.navigate('Home');
        }}
        size="sm"
        placement="bottom right"
        isHovered={false}
        isDisabled={false}
        isPressed={false}>
        <FabIcon as={ArrowLeftIcon} mr="$1" />
        <FabLabel>Back</FabLabel>
      </Fab>
    );
  };

  const FabMenu = () => {
    return (
      <Menu
        focusable
        isOpen={isOpen}
        selectionMode="single"
        selectedKeys={selected}
        onSelectionChange={keys => {
          const selectedMenuItem: any = keys;
          if (selectedMenuItem.currentKey === 'TripHistory') {
            navigation.navigate('Transport Trip', {
              curentVehicle,
            });
            setShowMenu(false);
          }
          if (selectedMenuItem.currentKey === 'ManageTrip') {
            navigation.navigate('Assign Passenger', {
              curentVehicle,
            });
            setShowMenu(false);
          }
        }}
        closeOnSelect={true}
        onClose={() => {
          setShowMenu(false);
          setIsOpen(false);
        }}
        // style={{backgroundColor: '#7DD3F2'}}
        placement="top"
        trigger={({...triggerProps}) => {
          return (
            <Fab
              {...triggerProps}
              style={{zIndex: 1}}
              size="md"
              placement="bottom right"
              isHovered={false}
              isDisabled={false}
              isPressed={false}>
              <FabIcon as={AddIcon} />
            </Fab>
          );
        }}>
        <MenuItem key="TripHistory" textValue="Trip History">
          <Route
            style={{marginEnd: 5}}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
          />
          <MenuItemLabel size="sm">Trip History</MenuItemLabel>
        </MenuItem>
        <MenuItem key="ManageTrip" textValue="Manage Trip">
          <BookUser
            style={{marginEnd: 5}}
            size={iconSize}
            strokeWidth={iconStrokeWidth}
            color={iconColor}
          />
          <MenuItemLabel size="sm">Manage Trip</MenuItemLabel>
        </MenuItem>
      </Menu>
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const formattedQuery = query;
    const filterData: any = filter(fullData, (user: any) => {
      return contains(user, formattedQuery);
    });

    setVehicleList(filterData);
  };

  const contains = (
    {color, fullName, licenseNumber, make, model}: any,
    query: any,
  ) => {
    if (
      color.includes(query) ||
      fullName.includes(query) ||
      licenseNumber.includes(query) ||
      make.includes(query) ||
      model.includes(query)
    ) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={FlatlistStyles.container}>
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          autoCapitalize="none"
          style={styles.searchBox}
          autoCorrect={false}
          value={searchQuery}
          onChangeText={(query: string) => handleSearch(query)}
        />
        {noLinkedVehicle ? EmtpyFlatListText() : null}
        <FlatList
          style={{backgroundColor: '#e8f0f3'}}
          data={vehicleList}
          renderItem={({item}) => renderItemComponentVehicleInfo(item)}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        {showMenu ? FabMenu() : GoBackFab()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchBox: {
    marginHorizontal: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
});

export default ManageTripsScreen;
