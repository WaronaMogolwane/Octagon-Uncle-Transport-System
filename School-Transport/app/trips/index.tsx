import * as React from "react";
import {
  FlatList,
  Pressable,
  View,
  useWindowDimensions,
  Text,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { TripCard } from "../../src/Components/TripCard";
import { randomData } from "../../src/randomData/SampleData";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Trips() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "upcoming", title: "Upcoming Trips " },
    { key: "previous", title: "Previouse Trips" },
  ]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  );
}

const renderItemComponent = (itemData: any) => (
  <TripCard
    driverName={itemData.driverName}
    pickUpTime={itemData.pickUpTime}
    pickUpDate={itemData.pickUpDate}
    passengerName={itemData.passengerName}
    pickUpLocation={itemData.pickUpLocation}
  />
);

const FirstRoute = () => (
  <View style={{ flex: 1 }}>
    <FlatList
      data={randomData}
      renderItem={({ item }) => renderItemComponent(item)}
    />
  </View>
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }}></View>
);

const renderScene = SceneMap({
  upcoming: FirstRoute,
  previous: SecondRoute,
});
