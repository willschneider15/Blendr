import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';


interface ListItemProps {
  style: StyleSheet;
  leftView: View;
  rightView: View;
}

export default function ListItem(props) {
  return (
    <View style={{width: '100%'}}>
      {this.props.leftView}
      {this.props.rightView}
    </View>
  );
}