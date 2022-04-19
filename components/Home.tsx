// components/Stock.tsx
import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Stock from './Stock';
import config from "../config/config.json";
import {
    useFonts,
    // Roboto_100Thin,
    // Roboto_100Thin_Italic,
    // Roboto_300Light,
    // Roboto_300Light_Italic,
    Roboto_400Regular,
    // Roboto_400Regular_Italic,
    // Roboto_500Medium,
    // Roboto_500Medium_Italic,
    // Roboto_700Bold,
    // Roboto_700Bold_Italic,
    // Roboto_900Black,
    // Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
import { Base } from '../styles';
import candy from '../assets/klubba.jpg';

export default function Home({ products, setProducts }) {
    return (
        <ScrollView style={Base.base}>
            <Image source={candy} style={Base.headerImage} />
            <Stock products={products} setProducts={setProducts} />
        </ScrollView>
    );
}