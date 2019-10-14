import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import Colors from '../constants/colors';
import Header from '../components/Header';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';

class AboutScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {date: ''};
  }

  selectDate = date => {
    this.setState({date: date});
  };

  render() {
    return (
      <View style={styles.cor}>
        <View style={styles.principalContainer}>
          <Header textHeader="SOBRE" statusBarColor={Colors.primaria} />
          <View style={styles.aboutContainer}>
            <View style={styles.aboutHeader}>
              <IconAwesome
                name="people-carry"
                size={24}
                color={Colors.primaria}
              />
              <Text style={styles.aboutHeaderText}>DESENVOLVEDORES</Text>
            </View>
            <View style={styles.aboutBody}>
              <View>
                <Text style={styles.aboutBodyText}>Guilherme Rocha</Text>
                <Text style={styles.aboutBodyText}>Thomas Anderson</Text>
                <Text style={styles.aboutBodyText}>Victor Masumoto</Text>
              </View>
              <View>
                <Text style={styles.aboutBodyText}>RA: 22.118.024-3</Text>
                <Text style={styles.aboutBodyText}>RA: 22.118.175-3</Text>
                <Text style={styles.aboutBodyText}>RA: 22.118.000-0</Text>
              </View>
            </View>
            <View style={styles.aboutFooter}>
              <Text style={styles.aboutFooterText}>Versão v1.00</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  principalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cor: {
    flex: 1,
    backgroundColor: Colors.primaria,
  },
  aboutContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: 'rgb(255,255,255)',
    borderRadius: 4,
    margin: 10,
    justifyContent: 'space-between',
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  aboutBodyText: {
    color: 'black',
    margin: 5,
    fontSize: 15,
  },
  aboutFooterText: {
    color: 'black',
    margin: 5,
    fontSize: 15,
  },
  aboutBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutHeaderText: {
    color: Colors.primaria,
    margin: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  aboutFooter: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    paddingVertical: 20,
  },
});

export default AboutScreen;
