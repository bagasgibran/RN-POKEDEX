import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default class Abilities extends Component {  
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('name', 'Abilities Name'),
        };
      };
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          error: null,
        };
    }  
    
    componentDidMount() {
        this.makeRemoteRequest(); 
    }
    
    makeRemoteRequest = () => {
        const { navigation } = this.props;
        const url = navigation.getParam('url', 'Link Abilities Pokemon');    
        fetch(url)
        .then(res => res.json())
        .then(res => {
            this.setState({
                data: [res],
                error: res.error || null
            });
        })
        .catch(error => {
            this.setState({ error });
        });
    };

    render() {
        return (
            <View style={styles.Container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({item}) => (
                        <Text style={styles.Text}> {item.effect_entries[0].effect} </Text>
                    ) }
                    keyExtractor={item => item.id.toString()}
                /> 
            </View>
        );
    }
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical:5
  },
  text: {
    fontSize: 22,
    textAlign: 'right'
  }
});


