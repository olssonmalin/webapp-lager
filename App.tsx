import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  useFonts,
  // Roboto_100Thin,
  // Roboto_100Thin_Italic,
  // Roboto_300Light,
  // Roboto_300Light_Italic,
  Roboto_400Regular,
  // Roboto_400Regular_Italic,
  Roboto_500Medium,
  // Roboto_500Medium_Italic,
  // Roboto_700Bold,
  // Roboto_700Bold_Italic,
  // Roboto_900Black,
  // Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
import Stock from './components/Stock';
import Home from './components/Home';
import Pick from './components/Pick';
import Deliveries from './components/Deliveries';
import Auth from './components/auth/Auth';
import Invoices from './components/Invoices';

import { Ionicons } from '@expo/vector-icons';
import { Base, Typography } from './styles';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FlashMessage from 'react-native-flash-message';
import authModel from "./models/auth";
import Ship from './components/ship/Ship';

const Tab = createBottomTabNavigator();
const routeIcons = {
  "Lager": "home",
  "Plock": "list",
  "Leverans": "archive-outline",
  "Faktura": "book-outline",
  "Logga in": "key"
};

export default function App() {
  const [products, setProducts] = useState<any[]>([]);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);
  const [allOrders, setAllOrders] = useState([]);


  useEffect(async () => {
    setIsLoggedIn(await authModel.loggedIn());
  }, []);


  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium
  }); if (!fontsLoaded) {
    return <></>;
  }

  return (
    <SafeAreaView style={Base.base}>
      <Text style={Typography.header1}>Lager-Appen</Text>
      <NavigationContainer >
        <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = routeIcons[route.name] || "alert";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
        >
          <Tab.Screen name="Lager">
            {() => <Home products={products} setProducts={setProducts} />}
          </Tab.Screen>
          <Tab.Screen name="Plock">
            {() => <Pick products={products} setProducts={setProducts} allOrders={allOrders} setAllOrders={setAllOrders} />}
          </Tab.Screen>
          <Tab.Screen name="Leverans">
            {() => <Deliveries products={products} setProducts={setProducts} deliveries={deliveries} setDeliveries={setDeliveries} />}
          </Tab.Screen>
          {isLoggedIn ?
            <Tab.Screen name="Faktura">
              {() => <Invoices setIsLoggedIn={setIsLoggedIn} invoices={invoices} setInvoices={setInvoices} allOrders={allOrders} setAllOrders={setAllOrders} />}
            </Tab.Screen> :
            <Tab.Screen name="Logga in">
              {() => <Auth setIsLoggedIn={setIsLoggedIn} />}
            </Tab.Screen>
          }
          <Tab.Screen name="Ship">
            {() => <Ship allOrders={allOrders} setAllOrders={setAllOrders} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
      <FlashMessage position="top" />
    </SafeAreaView >
  );
}
