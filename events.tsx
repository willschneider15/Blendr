import React, {Component } from 'react';
import {View, Text, Grid, Row} from 'react-native';

interface EventsScreenProps {
    navigation;
} 

export default class EventScreen extends Component<EventsScreenProps> {
    constructor(props) {
        super(props);
    }

    render()
    {
        return (
                <Text>testing</Text> 
        );
    }
}

