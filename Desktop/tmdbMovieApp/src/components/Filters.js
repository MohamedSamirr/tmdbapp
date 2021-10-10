import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RadioButton } from 'react-native-paper';

const Filters = ({ setSearchType }) => {
  const [checked, setChecked] = React.useState('movie');
  return (
    <View style={styles.container}>
      <View style={styles.filterButton}>
        <Text style={styles.filterText}>Upcoming</Text>
        <RadioButton
          styles={styles.filterButton}
          value="movie"
          background='black'
          // status={checked === 'movie' ? 'checked' : 'unchecked'}
          onPress={() => {
            setSearchType('movie');
            // setChecked('movie');
          }}
        />
      </View>

      <View style={styles.filterButton}>
        <Text style={styles.filterText} >Popular</Text>
        <RadioButton
          value="tv"
          // status={checked === 'tv' ? 'checked' : 'unchecked'}
          onPress={() => {
            setSearchType('tv');
            setChecked('tv');
          }}
        />
        
      </View>

      <View style={styles.filterButton}>
        <Text style={styles.filterText}>Top Rated</Text>
        <RadioButton
          value="person"
          // status={checked === 'person' ? 'checked' : 'unchecked'}
          onPress={() => {
            setSearchType('person');
            setChecked('person');
          }}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginHorizontal: 30
  },
  filterButton: {
    backgroundColor: "#D8D8D8",
    padding: 10,
    paddingVertical: 1,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginLeft: 20,
    marginVertical: 10,


  },
  filterText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    // marginVertical: 20
  }
});

export default Filters;