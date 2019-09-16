import React, { Component } from 'react';
import { FlatList, StyleSheet, View,ActivityIndicator } from 'react-native';
import DetailFilter from '../navigation/DetailFilter';

export default class FilterPokemon extends Component {  
  static navigationOptions = {
    title: 'FILTER',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      pokemon: [],
      pokemon: [],
      url: 'https://pokeapi.co/api/v2/type',
      error: null,
      refreshing: false,
    };
  } 

  componentDidMount() {
    this.makeRemoteRequest(); 
  }

  

   makeRemoteRequest = () => {
    const { url } = this.state;
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
        res.results.forEach((x,i) => {
          fetch(x.url).then(res2 => res2.json())
          .then(res2 => {
            if(res2.pokemon.length > 0){
              this.setState({
                pokemon: [...this.state.pokemon,...[res2.pokemon[0].pokemon.url.slice(34,-1)]]
              });
              //console.log(res2.pokemon[0].pokemon.url.slice(34,-1));
            }else{
              this.setState({
                pokemon: [...this.state.pokemon,25]
              });
            }
          });
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };



  render() {
    return ( 
      <View style={styles.container}>
          <FlatList
            data={this.state.data}
            extraData={this.state.pokemon}
            renderItem={({item,index}) => <DetailFilter name={item.name} image={this.state.pokemon[index]} navigation={this.props.navigation} url={item.url} /> }
            numColumns={4}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
          /> 
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  item: {
    fontSize: 18
  },
})
