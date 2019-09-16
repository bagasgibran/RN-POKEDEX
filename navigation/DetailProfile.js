import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';


const DetailProfile = props => {

  return (
    <View style={styles.container}>
      <View style={styles.detailprofile}>
          <View>
              <View style={{ ...styles.pokeRow, ...styles.pokeHeader }}>
                <ImageBackground
                    source={{ uri: 'https://img.pokemondb.net/artwork/vector/'+props.item.name+'.png' }}
                    style={styles.bgImage}
                  >
                    <View style={styles.titleContainer}>
                      <Text style={styles.title} numberOfLines={1}>
                        {props.item.name.toUpperCase()}
                      </Text>
                    </View>
                  </ImageBackground>
              </View>
          </View>
      </View>
      <View style={{ ...styles.pokeRow, ...styles.pokeDetail }}>
              <View>
                <Text>Types :</Text>
                  <FlatList
                    data={props.item.types}
                    renderItem={({item}) => (<Text>{item.type.name.toUpperCase()}</Text>)}
                    listKey={(item, index) => index.toString()}
                    keyExtractor={(item, index) => index.toString()}
                  /> 
              </View>
                
              <Text>Height : {props.item.height} m</Text>
              <Text>Weight : {props.item.weight} kg</Text>
            </View>
      <Divider />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
              ABILITIES
        </Text>
      </View>
      <View style={{...styles.pokeRow,...styles.pokeAbilities}}>
        <FlatList
          data={props.item.abilities}
          renderItem={({item}) => (<TouchableOpacity style={{ paddingVertical:5 }}
            onPress = { () => props.navigation.navigate('Abilities', {url: item.ability.url, name:item.ability.name.toUpperCase()}) }>      
                <Text>{item.ability.name.toUpperCase()} ></Text>
            </TouchableOpacity>)}
          listKey={(item, index) => 'A'+index.toString()}
          keyExtractor={(item, index) => 'A'+index.toString()} 
        /> 
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
              STATS
        </Text>
      </View>
      <View style={{...styles.pokeRow,...styles.pokeAbilities}}>
        <FlatList
          data={props.item.stats}
          renderItem={({item}) => (<TouchableOpacity style={{ paddingVertical:5 }}>      
                <Text>{item.stat.name.toUpperCase()}  : {item.base_stat}</Text>
            </TouchableOpacity>)}
          listKey={(item, index) => 'S'+index.toString()}
          keyExtractor={(item, index) => 'S'+index.toString()} 
        /> 
      </View>
    </View>
    );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    padding: 15
  },
  detailprofile: {
    height: 400,
    width: '100%',
    backgroundColor: '#fecf33',
    borderRadius: 10,
    overflow: 'hidden'
  },
  bgImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  pokeRow: {
    flexDirection: 'row'
  },
  pokeHeader: {
    height: '100%'
  },
  pokeDetail: {
    marginTop: 3,
    paddingHorizontal: 4,
    backgroundColor: '#fecf33',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '10%'
  },
  pokeAbilities: {
    paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fecf33',
    overflow: 'hidden'
  },
  titleContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
    paddingHorizontal: 12
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center'
  }
});

export default DetailProfile;
