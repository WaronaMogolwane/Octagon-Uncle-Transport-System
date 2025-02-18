import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {TripCardTransporterComplete} from './Cards/TripCardTransporter';
import COLORS from '../Const/colors';
import {GroupedFlatListStyles} from '../Stylesheets/GlobalStyles';
import {ArrowDown, ArrowLeft, Minus, Plus} from 'lucide-react-native';
import {TripCardDriver} from './Cards/TripListCardForDriver';
import {TripCardParentComplete} from './Cards/TripListForParentCard';

// // Define the type for a single record
type Record = {
  driverName?: string;
  tripId: string;
  passengerId: string;
  pickUpTime: string;
  passengerName: string;
  dropOffLocation: string;
  pickUpLocation: string;
  tripStatus: string;
  dropOffTime: string;
  leg: number;
  pickUpDate: string;
  title: string;
};

// Define the type for grouped data
type GroupedData = {
  [key: string]: Record[];
};

type GroupedFlatListProps = {
  pastTrips: Record[];
  role: string;
};

const GroupedFlatList: React.FC<GroupedFlatListProps> = ({pastTrips, role}) => {
  const [expandedGroups, setExpandedGroups] = useState<{
    [key: string]: boolean;
  }>({});

  const iconSize = 18;
  const iconStrokeWidth = 1.5;

  //The arrow down icon
  const plus = (
    <Plus
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={COLORS.customBlack}
    />
  );

  //The arrow left icon
  const minus = (
    <Minus
      size={iconSize}
      strokeWidth={iconStrokeWidth}
      color={COLORS.customBlack}
    />
  );

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const currentDate = getCurrentDate();

  // Helper function to get the start of the week for a given date
  const getStartOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    const dayOfWeek = date.getDay(); // 0 (Sunday) to 6 (Saturday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);
    return startOfWeek.toISOString().split('T')[0];
  };

  // Helper function to get the month and year for a given date
  const getMonthYear = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleString('default', {
      month: 'long',
    })} ${date.getFullYear()}`;
  };

  // Helper function to get the year for a given date
  const getYear = (dateString: string) => {
    return new Date(dateString).getFullYear().toString();
  };

  // Separate records for the current date and group the rest by week, month, and year
  const {currentDateRecords, groupedData} = pastTrips.reduce(
    (acc, item) => {
      if (item.pickUpDate === currentDate) {
        acc.currentDateRecords.push(item);
      } else {
        const weekStart = getStartOfWeek(item.pickUpDate);
        const monthYear = getMonthYear(item.pickUpDate);
        const year = getYear(item.pickUpDate);

        // Group by year
        if (!acc.groupedData[year]) {
          acc.groupedData[year] = {};
        }

        // Group by month within the year
        if (!acc.groupedData[year][monthYear]) {
          acc.groupedData[year][monthYear] = {};
        }

        // Group by week within the month
        if (!acc.groupedData[year][monthYear][weekStart]) {
          acc.groupedData[year][monthYear][weekStart] = [];
        }

        acc.groupedData[year][monthYear][weekStart].push(item);
      }
      return acc;
    },
    {
      currentDateRecords: [] as Record[],
      groupedData: {} as {[key: string]: {[key: string]: GroupedData}},
    },
  );

  // Toggle the visibility of a group
  const toggleExpand = (key: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Render a single record item
  const renderItem = ({item}: {item: Record}) => {
    if (Number(role) === 1) {
      return (
        <TripCardTransporterComplete
          passengerName={item.passengerName}
          pickUpTime={item.pickUpTime}
          pickUpDate={item.pickUpDate}
          pickUpLocation={item.pickUpLocation}
          tripStatus={Number(item.tripStatus)}
          dropOffTime={item.dropOffTime}
          leg={Number(item.leg)}
          handleIconPress={() => {
            // Handle icon press for role 1
          }}
        />
      );
    } else if (Number(role) === 2) {
      return (
        <TripCardParentComplete
          driverName={item.driverName ?? ''}
          pickUpTime={item.pickUpTime}
          pickUpDate={item.pickUpDate}
          passengerName={item.passengerName}
          pickUpLocation={item.pickUpLocation}
          tripStatus={Number(item.tripStatus)}
          dropOffTime={item.dropOffTime}
          leg={item.leg}
          handleAbsentPassenger={() => {
            // Handle icon press for other roles
          }}
        />
      );
    } else {
      return (
        <TripCardDriver
          passengerName={item.passengerName}
          pickUpTime={item.pickUpTime}
          pickUpDate={item.pickUpDate}
          pickUpLocation={item.pickUpLocation}
          tripStatus={Number(item.tripStatus)}
          dropOffTime={item.dropOffTime}
          leg={item.leg}
          handleUndo={() => {
            // if (itemData.tripStatus == 0) {
            //   if (currentDate == itemData.pickUpDate.toString()) {
            //     UndoTripEnd(itemData.tripId).then(() => {
            //       setIsLoading(true);
            //       GetUpcomingTrips();
            //       GetPastTrips();
            //     });
            //   } else {
            //     WarningToast();
            //   }
            // } else if (itemData.tripStatus == 1) {
            //   if (currentDate == itemData.pickUpDate.toString()) {
            //     UndoTripEnd(itemData.tripId).then(() => {
            //       setIsLoading(true);
            //       GetUpcomingTrips();
            //       GetPastTrips();
            //     });
            //   } else {
            //     WarningToast();
            //   }
            // } else if (itemData.tripStatus == 3) {
            //   UndoTripDropOffTime(itemData.tripId).then(() => {
            //     setIsLoading(true);
            //     GetUpcomingTrips();
            //     GetPastTrips();
            //   });
            // }
          }}
        />
      );
    }
  };

  // Render a group header
  const renderGroupHeader = (title: string, key: string) => (
    <TouchableOpacity
      onPress={() => toggleExpand(key)}
      style={GroupedFlatListStyles.groupHeader}>
      <Text style={GroupedFlatListStyles.groupHeaderText}>{title}</Text>
      {expandedGroups[key] ? minus : plus}
    </TouchableOpacity>
  );

  // Render the grouped data
  const renderGroupedData = () => {
    return Object.entries(groupedData).map(([year, months]) => (
      <View key={year}>
        {renderGroupHeader(`${year}`, year)}
        {expandedGroups[year] &&
          Object.entries(months).map(([monthYear, weeks]) => (
            <View key={monthYear}>
              {renderGroupHeader(`${monthYear}`, monthYear)}
              {expandedGroups[monthYear] &&
                Object.entries(weeks).map(([weekStart, records]) => (
                  <View key={weekStart}>
                    {renderGroupHeader(
                      `Week Starting: ${weekStart.replace(/-/g, '/')}`,
                      weekStart,
                    )}
                    {expandedGroups[weekStart] && (
                      <FlatList
                        data={records}
                        keyExtractor={item => item.tripId}
                        renderItem={renderItem}
                      />
                    )}
                  </View>
                ))}
            </View>
          ))}
      </View>
    ));
  };

  return (
    <FlatList
      style={GroupedFlatListStyles.container}
      ListHeaderComponent={
        <>
          {/* Display current date records at the top */}
          {currentDateRecords.length > 0 && (
            <View style={GroupedFlatListStyles.container}>
              <Text style={GroupedFlatListStyles.currentDateHeader}>
                Today ({currentDate.replace(/-/g, '/')})
              </Text>
              <FlatList
                data={currentDateRecords}
                keyExtractor={item => item.tripId}
                renderItem={renderItem}
              />
            </View>
          )}
        </>
      }
      data={[]} // Empty data array because we're rendering everything manually
      renderItem={() => null} // No need to render items here
      ListFooterComponent={
        <View style={GroupedFlatListStyles.container}>
          {/* Render grouped data */}
          {renderGroupedData()}
        </View>
      }
    />
  );
};

export default GroupedFlatList;
