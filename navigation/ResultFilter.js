import React, { Component } from 'react';
import { FlatList, StyleSheet, View,ActivityIndicator } from 'react-native';
import ListPokemon from "../components/ListPokemon"; 

export default class ResultFilter extends Component {  
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('name', 'Pokemon Types Name'),
        };
      };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null,
      refreshing: false,
    };
  } 

  componentDidMount() {
    this.makeRemoteRequest(); 
  }

  

   makeRemoteRequest = () => {
    const { navigation } = this.props;
    const url = navigation.getParam('url', 'Link Detail Pokemon');
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.pokemon,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  handleRefresh = () =>{
    this.setState({
      refreshing: true,
      data: []
    },() => {
      this.makeRemoteRequest();
    });
  };



  render() {
    return ( 
      <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <ListPokemon name={item.pokemon.name} navigation={this.props.navigation} url={item.pokemon.url} /> }
            keyExtractor={item => item.pokemon.url}
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
