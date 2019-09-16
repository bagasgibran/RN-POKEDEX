import React from 'react';
import { StyleSheet } from 'react-native';
import {ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';

export default class ListPokemon extends React.PureComponent {
    render() {
        return (
              <ListItem
                style={{ ...styles.gridItem,...styles.container, ...{ backgroundColor: '#fecf33' } }}
                Component={TouchableScale}
                friction={100} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} // 
                linearGradientProps={{
                colors: ['#b39226', '#fecf33'],
                start: [1, 0],
                end: [0.2, 0],
                }} 
                onPress={() => this.props.navigation.navigate('Profile', {url: this.props.url, name: this.props.name.toUpperCase()})}
                title={`${this.props.name.charAt(0).toUpperCase() +this.props.name.slice(1)}`} 
                titleStyle={{ color: 'white', fontWeight: 'bold' }}
                leftAvatar={{ size: 72 ,source: { uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+this.props.url.slice(34,-1)+'.png' } }}
                bottomDivider
                chevron={{ color: 'white',size: 60 }}
                />
            
        );
    }
  } 
const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 15,
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold'
  }
})
