import React, { Component } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator } from 'react-native';
import DetailProfile from '../navigation/DetailProfile';

export default class Profile extends Component {  
    
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('name', 'Pokemon Name'),
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
    this.setState({ loading: true });
      fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: [res],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false, refreshing: false });
      });
  };

  render() {
    const { loading } = this.state;
    return ( 
      <View style={styles.container}>
          {loading && (
            <ActivityIndicator size="large" color="#0000ff" />
            )}
          <FlatList
            data={this.state.data}
            renderItem={({item}) => <DetailProfile item={item} navigation={this.props.navigation} /> }
            keyExtractor={item => item.name}
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
