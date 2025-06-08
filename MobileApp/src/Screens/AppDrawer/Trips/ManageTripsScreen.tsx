import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {ChangeEvent, useContext, useEffect, useState} from 'react';
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
import {
  FlatlistStyles,
  ManageTripsScreenStyles,
  ThemeStyles,
} from '../../../Stylesheets/GlobalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import filter from 'lodash.filter';
import {CurrentVehicle} from '../../../Models/CurrentVehicle';
import {BookUser, Route} from 'lucide-react-native';
import {CustomInputSearch} from '../../../Components/CustomFormInput';

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
  const [currentVehicle, setCurrentVehicle] = useState<CurrentVehicle>();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      GetLinkedVehicle();
    }, 2000);
  }, []);

  const iconSize = 20;
  const iconStrokeWidth = 1;
  const iconColor = '#000000';

  useEffect(() => {
    setRefreshing(true);
    GetLinkedVehicle();
  }, []);

  useEffect(() => {
    if (fullData.length > 0) {
      handleSearch('');
    }
  }, [fullData]);

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
          setFullData(result);
          setRefreshing(false);
          setNoLinkedVehicle(false);
        }
      })
      .catch(() => {
        setRefreshing(false);
      });
  };

  const renderItemComponentVehicleInfo = React.useCallback(
    (itemData: any) => (
      <VehicleCard
        registrationNumber={itemData.licenseNumber}
        make={itemData.make}
        model={itemData.model}
        color={itemData.color}
        fullName={itemData.fullName}
        urlFront={itemData.FrontImageUrl}
        onPress={() => {
          const vehicle = new CurrentVehicle(
            itemData.dVLId,
            itemData.make,
            itemData.model,
            itemData.color,
            itemData.licenseNumber,
            itemData.vehicleId,
          );
          setCurrentVehicle(vehicle);
          setShowMenu(true);
          setIsOpen(true);
        }}
      />
    ),
    [],
  );

  const EmtpyFlatListText = () => {
    return (
      <View style={ManageTripsScreenStyles.emptyFlatlistText}>
        <Text style={{textAlign: 'center'}}>
          You currently have no linked vehicles. Please add vehicles and try
          again.
        </Text>
      </View>
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
              curentVehicle: currentVehicle,
            });
            setShowMenu(false);
          }
          if (selectedMenuItem.currentKey === 'ManageTrip') {
            navigation.navigate('Assign Passenger', {
              curentVehicle: currentVehicle,
            });
            setShowMenu(false);
          }
        }}
        closeOnSelect={true}
        onClose={() => {
          setShowMenu(false);
          setIsOpen(false);
        }}
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
    const formattedQuery = query.toLowerCase();
    const filterData: any = filter(fullData, (user: any) => {
      return contains(user, formattedQuery);
    });

    setVehicleList(filterData);
  };

  const contains = (
    {color, fullName, licenseNumber, make, model}: any,
    query: string,
  ) => {
    if (
      color.toLowerCase().includes(query) ||
      fullName.toLowerCase().includes(query) ||
      licenseNumber.toLowerCase().includes(query) ||
      make.toLowerCase().includes(query) ||
      model.toLowerCase().includes(query)
    ) {
      return true;
    }

    return false;
  };

  return (
    <SafeAreaView style={ThemeStyles.container}>
      <CustomInputSearch
        value={searchQuery}
        onChangeText={(query: any) => {
          handleSearch(query);
        }}
      />
      {noLinkedVehicle ? EmtpyFlatListText() : null}
      <FlatList
        style={ManageTripsScreenStyles.flatList}
        data={vehicleList}
        renderItem={({item}) => renderItemComponentVehicleInfo(item)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      {showMenu ? FabMenu() : null}
    </SafeAreaView>
  );
};

export default ManageTripsScreen;
