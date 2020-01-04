import React, { Component } from 'react';
import {View, Text} from 'react-native';

interface HomeScreenProps {
    navigation;
}

export default class HomeScreen implements Component<HomeScreenProps> {
    constructor(props: HomeScreenProps) {
        super(props);
    }

    render() {
        return (
            <View>
                <Text>Hello world</Text>
            </View>
        );
    }
} 

