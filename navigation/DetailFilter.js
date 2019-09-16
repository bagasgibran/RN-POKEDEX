import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet, 
  Platform,
  Image,
  TouchableNativeFeedback
} from 'react-native';

const FilterPokemon = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  return (
    <View style={styles.gridItem}>
      <TouchableCmp style={{ flex: 1 }} onPress={() => props.navigation.navigate('Result', {url: props.url, name: props.name.toUpperCase()})}>
        <View
          style={{ ...styles.container, ...{ backgroundColor: '#d4ad2e' } }}
        >
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/'+props.image+'.png'}}
        />
          <Text style={styles.title} numberOfLines={2}>
              {props.name} 
          </Text>
        </View>
      </TouchableCmp>
    </View>
  );
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 5,
    height: 100,
    borderRadius: 10,
    overflow:
      Platform.OS === 'android' && Platform.Version >= 21
        ? 'hidden'
        : 'visible',
    elevation: 5
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 15,
    textAlign: 'right',
    color: 'white',
    fontWeight: 'bold'
  }
});

export default FilterPokemon;
