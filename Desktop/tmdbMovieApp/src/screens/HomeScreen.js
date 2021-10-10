import React, { useState, useEffect } from 'react';
import { TouchableOpacity, FlatList, View, Text, StyleSheet, Image } from 'react-native';
import SearchBar from '../components/SearchBar';
import tmdb from '../api/tmdb';
import Filters from "../components/Filters";


const HomeScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [filter, setSearchType] = useState('movie');
  const [baseURL, setBaseURL] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    searchTmdb(text)
    getConfigs();
  }, [filter]);

  async function getConfigs() {
    try {
      const response = await tmdb.get('/configuration');
      setBaseURL(response.data.images.base_url);
    } catch (error) {

    }
  }

  async function searchTmdb(query) {
    try {
      const response = await tmdb.get(`/search/${filter}`, {
        params: {
          query,
          include_adult: false
        }
      });
      setResults(response.data.results);
    }
    catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <SearchBar
        value={text}
        onTextChange={(t) => setText(t)}
        onTextSubmit={(t) => searchTmdb(t)}
        style={styles.busca}
      />
      <Filters
        setSearchType={setSearchType}
      />
      <FlatList
        style={styles.result}
        data={results}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => {
          return (
            <View >
              <TouchableOpacity
                onPress={() => navigation.navigate("Details",
                  {
                    id: item.id,
                    filter,
                    baseURL
                  }
                )}
              >
                <View style={styles.item}>
                  <Image
                    style={styles.moviePoster}
                    source={
                      {
                        uri: `${baseURL}w500/${item.poster_path || item.backdrop_path || item.profile_path}`
                      }
                    } />

                  {/* <MaterialIcons name="moviePoster" size={24} color="black" /> */}
                  <View style={styles.movieData}>
                    <Text style={styles.movieTitle}>{item.original_title || item.name}</Text>
                    <Text style={styles.movieDate}>{item.release_date || item.date}</Text>
                    <Text style={styles.movieGenre}>{item.genre_name || item.genre}</Text>
                    <Text style={styles.movieVote}>{(item.vote_average * 10) + '%' || (item.votes * 10) + '%'}</Text>


                  </View>

                </View>
              </TouchableOpacity>
            </View>

          )
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({


  filtros: {
    flex: 1
  },

  movieData: {
    flexDirection: 'column'
  },

  movieTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 25,
    color: '#4B4B4B'
  },

  moviePoster: {
    borderRadius: 15,
    width: 100,
    height: 140,
    marginLeft: 20,
    marginTop: 20,
    marginRight: 10,
    marginBottom: 20
  },


  movieDate: {
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 12,
    color: '#4B4B4B'
  },

  movieRating: {

  },


  movieGenre: {
    fontWeight: 'bold',
    fontSize: 14,



  },

  movieVote: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#67B339',
    marginLeft: 195,
    marginTop: 25
  },

  busca: {
    flex: 1,
    borderColor: 'black',


  },

  result: {
    flex: 8,
    backgroundColor: 'white',
    borderRadius: 20,
  },

  item: {
    flexDirection: 'row',
    // alignItems:'center'
  }

});

export default HomeScreen;