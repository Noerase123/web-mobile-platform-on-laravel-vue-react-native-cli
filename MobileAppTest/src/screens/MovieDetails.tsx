import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Image } from '@rneui/themed';
import { PlayIcon } from '../components';
import { ShareIcon, BackIcon, UserIcon } from '../../assets/icons';
import axios from 'axios';
import { useColorScheme } from 'react-native';

type TMovieDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
	Actors: string;
	Plot: string;
	Language: string;
	Country: string;
	Awards: string;
	Poster: string;
	Ratings: {
    Source: string;
    Value: string;
  }[],
	Metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	Type: string;
	DVD: string;
	BoxOffice: string;
	Production: string;
	Website: string;
	Response: string;
}

export function MovieDetails(): React.JSX.Element {
  const navigation = useNavigation();
  const route = useRoute<any>();
  const [details, setDetails] = useState<TMovieDetails | undefined>(undefined);
  const colorScheme = useColorScheme();
  
  const handleBack = () => navigation.goBack();

  const fetchMovieDetails = async () => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=eed823ea&i=${route.params.imdbID}`);
    console.log('fetchMovieDetails', JSON.stringify(response.data, null, '\t'));
    setDetails(response.data);
  }

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const textStyle = {
    style: {
      color: colorScheme === 'dark' ? '#fff' : '#000'
    }
  }

  return (
    <ScrollView style={{ backgroundColor: colorScheme === 'dark' ? '#07203C' : '#fff' }}>
      <StatusBar barStyle="light-content" />
      {details?.Poster !== 'N/A' ? (
        <Image
          source={{ uri: details?.Poster }}
          containerStyle={styles.backgroundPoster}
          PlaceholderContent={<ActivityIndicator />}
        />
      ) : (
        <View style={[styles.backgroundPoster, { backgroundColor: colorScheme === 'dark' ? '#51667C' : '#e1e1e1' }]}></View>
      )}
      <PlayIcon style={styles.playBtn} />
      <View style={styles.topPanel}>
        <Pressable onPress={handleBack}>
          <BackIcon />
        </Pressable>
        <Pressable onPress={handleBack}>
          <ShareIcon />
        </Pressable>
      </View>
      <View style={[styles.infoContainer, { marginTop: 165, }]}>
        {details?.Poster !== 'N/A' ? (
          <Image
            source={{ uri: details?.Poster }}
            containerStyle={styles.posterContainer}
            PlaceholderContent={<ActivityIndicator />}
          />
        ) : (
          <View style={[styles.thumbnailContainer, { backgroundColor: colorScheme === 'dark' ? '#51667C' : '#e1e1e1' }]}></View>
        )}
        <View style={styles.detailsInfo}>
          <Text {...textStyle}>Title: {`${details?.Title ?? ''} (${details?.Year ?? ''})`}</Text>
          <Text {...textStyle}>{details?.Genre}</Text>
          <Text {...textStyle}>{details?.Runtime}</Text>
          <Text {...textStyle}>Rated: {details?.Rated}</Text>
          <Text {...textStyle}>Type: {details?.Type}</Text>
          <Text {...textStyle}>Released: {details?.Released}</Text>
          <Text {...textStyle}>Country: {details?.Country}</Text>
        </View>
      </View>
      <Text style={[styles.titleOverview, styles.horizontal, { marginTop: 20, color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
        Plot Overview
      </Text>
      <View style={[styles.infoContainer, { marginTop: 20 }]}>
        <Text {...textStyle}>{details?.Plot}</Text>
      </View>
      <View style={[styles.horizontal, { marginBottom: 20 }]}>
        <Text style={[styles.vertical, styles.titleOverview, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
          Cast Overview
        </Text>
        <ScrollView horizontal>
          {details?.Actors.split(', ').map((dt, i) => (
            <View key={i} style={styles.actorContainer}>
              <View style={[styles.actorCard, { backgroundColor: colorScheme === 'dark' ? '#51667C' : '#e1e1e1' }]}>
                <UserIcon />
              </View>
              <Text style={[styles.actorName, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>
                {dt}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={[styles.horizontal, styles.vertical]}>
        <Text style={[styles.titleOverview, { marginBottom: 20, color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Ratings Overview</Text>
        <View style={styles.ratingColumn}>
          {details?.Ratings.map((rt, i) => (
            <View key={i} style={styles.ratingRow}>
              <Text {...textStyle}>{rt.Source}</Text>
              <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{rt.Value}</Text>
            </View>
          ))}
        </View>
        <View>
          <Text style={[styles.vertical, styles.titleOverview, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>Imdb Overview</Text>
          <View style={[styles.ratingRow, { marginBottom: 10 }]}>
            <Text {...textStyle}>Imdb Ratings</Text>
            <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{details?.imdbRating}</Text>
          </View>
          <View style={[styles.ratingRow, { marginBottom: 10 }]}>
            <Text {...textStyle}>Imdb Votes</Text>
            <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{details?.imdbVotes}</Text>
          </View>
          <View style={[styles.ratingRow, { marginBottom: 10 }]}>
            <Text {...textStyle}>Box Office</Text>
            <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{details?.BoxOffice}</Text>
          </View>
          <View style={[styles.ratingRow, { marginBottom: 10 }]}>
            <Text {...textStyle}>Production</Text>
            <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{details?.Production}</Text>
          </View>
          <View style={[styles.ratingRow, { marginBottom: 10 }]}>
            <Text {...textStyle}>Website</Text>
            <Text style={[styles.ratings, { color: colorScheme === 'dark' ? '#fff' : '#000' }]}>{details?.Website}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  ratingRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexDirection: 'row'
  },
  ratingColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10
  },
  ratings: {
    fontSize: 20
  },
  backBtn: {
    margin: 20
  },
  textWhite: {
    color: 'white'
  },
  topPanel: {
    marginTop: 60,
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backgroundPoster: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },
  playBtn: {
    position: 'absolute',
    top: 120,
    left: '43%',
    width: 50,
    height: 50
  },
  posterContainer: {
    height: 200,
    width: 130
  },
  horizontal: {
    marginHorizontal: 20
  },
  vertical: {
    marginVertical: 20
  },
  infoContainer: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20
  },
  detailsInfo: {
    width: 200,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  actorContainer: {
    marginHorizontal: 10
  },
  actorCard: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    backgroundColor: '#e1e1e1'
  },
  actorName: {
    marginTop: 5,
    width: 100,
    textAlign: 'center'
  },
  thumbnailContainer: {
    height: 200,
    width: 130,
    backgroundColor: '#e1e1e1'
  },
  titleOverview: {
    fontSize: 20
  }
});