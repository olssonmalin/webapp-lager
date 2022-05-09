import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useRef } from "react";
import { Marker } from "react-native-maps";
import { Base, Typography } from "../../styles";
import MapView from "react-native-maps";
import getCoordinates from "../../models/nominatim";
import * as Location from 'expo-location';


export default function ShipOrder({ route }) {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const map = useRef(null);

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setErrorMessage('Permission to access location was denied');
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});

            setLocationMarker(<Marker
                coordinate={{
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude
                }}
                title="Min plats"
                pinColor="blue"
                identifier="current"
            />);
        })();
    }, []);


    useEffect(() => {
        (async () => {
            const results = await getCoordinates(`${order.address}, ${order.city}`);

            console.log(results);
            setMarker(
                <Marker
                    coordinate={{ latitude: parseFloat(results[0].lat), longitude: parseFloat(results[0].lon) }}
                    title={results[0].display_name}
                    identifier="order"
                />);
        })();
    }, []);

    function fitMarkers() {
        if (map?.current) {
            const markerIDs = ["order", "current"];
            map.current.fitToSuppliedMarkers(markerIDs, { edgePadding: 100, animated: true });
        }
    }

    const orderItemsList = order.order_items.map((item, index) => {
        if (item.amount > item.stock) {
            inStock = false;
        }
        return <Text
            key={index}
        >
            {item.name} Antal: {item.amount} Hylla: {item.location}
        </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Skicka order</Text>
            <Text>{order.name}</Text>
            <Text>{order.address}</Text>
            <Text>{order.zip} {order.city}</Text>

            <Text>Produkter:</Text>

            {orderItemsList}
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    ref={map}
                    onMapReady={fitMarkers}
                    onMapLoaded={fitMarkers}
                    initialRegion={{
                        latitude: 56.1612,
                        longitude: 15.5869,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});