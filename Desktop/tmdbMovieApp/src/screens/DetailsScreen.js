import React, { useEffect, useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import tmdb from '../api/tmdb';
import item from '../screens/HomeScreen'


const DetailsScreen = ({ navigation, route, baseURL }) => {
  const [movie, setMovie] = useState({});

  async function getInfo(id, filter) {
    try {
      const response = await tmdb.get(`/${filter}/${id}`, {
        params: {
          include_adult: false
        }
      });
      setMovie(response.data);
      console.log(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    console.log(baseURL);
    getInfo(route.params.id, route.params.filter)
  }, []);

  return (

    <View style={{ flexDirection: 'column', backgroundColor: 'white'}}>

      <Image
        style={styles.image}
        source={
          {
            uri: `${route.params.baseURL}w500/${movie.poster_path || movie.backdrop_path || movie.profile_path}`
          }
        } />
      <View style={styles.titleContainer}>
        <Text style={styles.movieTitle}>{movie.original_title || movie.name}{"\n"}</Text>
        <Text style={styles.movieVote}>{(movie.vote_average * 10) + '%' || (movie.votes * 10) + '%'}</Text>
        <Text style={{marginHorizontal: 15}}><Text style={{ fontSize: 18, fontWeight: 'bold' }}>{route.params.filter != 'person' ? 'Overview:' : 'Biography'} {"\n"}</Text>{movie.overview || movie.biography}</Text>
        <Text>{movie.genre_name || movie.genre}</Text>

      </View>



    </View>

  )
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 15,
    width: 180,
    height: 280,
    marginLeft: 110,
    marginTop: 20,
    marginBottom: 20
  },
  titleContainer: {
    fontSize: 25,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'column'
  },
  movieTitle: {
    fontSize: 25,
    fontWeight: 'bold',

  },
  movieVote: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#67B339',
    // marginLeft: 195,
    marginTop: -20
  },

});

export default DetailsScreen;