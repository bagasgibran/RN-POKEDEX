import React, { PureComponent } from 'react';
import { FlatList, StyleSheet, View,ActivityIndicator } from 'react-native';
import ListPokemon from "../components/ListPokemon"; 

export default class Home extends PureComponent {  
  static navigationOptions = {
    title: 'POKEDEX',
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      next: '',
      url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      error: null,
      refreshing: false,
    };
  } 

  componentDidMount() {
    this.makeRemoteRequest(); 
  }

  

   makeRemoteRequest = () => {
    const { url } = this.state;
    setTimeout(() => {
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [...this.state.data, ...res.results],
          next: res.next || null,
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
    }, 1500);
  };

  handleRefresh = () =>{
    this.setState({
      url: 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20',
      refreshing: true,
      data: []
    },() => {
      this.makeRemoteRequest();
    });
  };

  handleLoadMore = () => { 
    this.setState({ loading: true });
    this.setState({
      url: this.state.next
    }, ()=> {
      this.makeRemoteRequest();  
    });
    
  };


  render() {
    const { loading } = this.state;
    return ( 
      <View style={styles.container}>
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <ListPokemon name={item.name} navigation={this.props.navigation} url={item.url} /> }
            keyExtractor={(item, index) => index.toString()}
            listKey={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh}
            onEndReached={this.handleLoadMore}
            onEndReachedThreshold={0}
          /> 
          {loading && (
            <ActivityIndicator size="large" color="#FECF33" />
            )}
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
