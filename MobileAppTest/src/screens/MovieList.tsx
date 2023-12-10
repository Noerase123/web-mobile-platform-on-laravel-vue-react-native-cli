import React, { useEffect, useState } from 'react';
import { View, Pressable, SafeAreaView, StyleSheet, FlatList, ActivityIndicator, StatusBar, Keyboard, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, Image } from '@rneui/themed';
import { BurgerMenuIcon, ImageIcon, SearchIcon } from '../../assets/icons';
import axios from 'axios';

type TMovies = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster?: string;
};

export function MovieList(): React.JSX.Element {
  const navigation = useNavigation<any>();
  const [search, setSearch] = useState('Marvel');
  const [searchEnable, setSearchEnable] = useState(false);
  const [data, setData] = useState<TMovies[]>([]);
  const [isLoading, setLoading] = useState(false);

  const fetchMovies = async (search: string) => {
    setLoading(true);
    const response = await axios.get(`https://omdbapi.com/?apikey=eed823ea&s=${search}&type=movie`);
    console.log('response fetchMovies', JSON.stringify(response.data.Search, null, '\t'));
    console.log('response', response.data);
    if (response.data.Response === "True") {
      setData(response.data.Search);
    } else {
      setData([]);
    }
    setLoading(false);
  }

  const onSubmitSearch = (text: string) => {
    setSearch(text);
    setSearchEnable(false);
  }
  const handleSearch = () => {
    setSearchEnable(true);
  }

  const isKeyboardVisible = Keyboard.isVisible();

  useEffect(() => {
    if (!isKeyboardVisible) {
      setSearchEnable(false);
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    if (search === '') {
      fetchMovies('Marvel');
    } else {
      fetchMovies(search);
    }
  }, [search]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Search "${search}"`,
      headerLeft: () => (
        <Pressable>
          <View style={styles.menuIcon}>
            <BurgerMenuIcon />
          </View>
        </Pressable>
      ),
      headerRight: () => (
        <Pressable onPress={handleSearch}>
          <View style={styles.accountIcon}>
            <SearchIcon fill="#000" width={25} height={25} />
          </View>
        </Pressable>
      )
    });
  }, [search]);

  const handleDetails = (imdbID: string) => () => {
    navigation.navigate('MovieDetails', { imdbID });
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle='dark-content' />
      <View style={styles.mainContainer}>
        {isLoading ? <ActivityIndicator style={{ marginTop: 20 }} size="large" /> : data.length > 0 ? (
          <FlatList
            style={{ marginTop: searchEnable ? 75 : 0 }}
            data={data}
            numColumns={2}
            keyExtractor={(item, index) => item.Title}
            renderItem={({ item }) => (
              <Card containerStyle={styles.cardContainer}>
                <Pressable onPress={handleDetails(item.imdbID)}>
                  {item.Poster !== 'N/A' ? (
                    <Image
                      source={{ uri: item?.Poster }}
                      containerStyle={styles.posterContainer}
                      PlaceholderContent={<ActivityIndicator />}
                    />
                  ) : (
                    <View style={styles.thumbnailContainer}>
                      <ImageIcon style={{ alignSelf: 'center' }} />
                      <Text>{item.Title}</Text>
                    </View>
                  )}
                </Pressable>
              </Card>
            )}
          />
        ) : (
          <Text style={styles.notFound}>No Movies found</Text>
        )}
        {searchEnable && (
          <View style={styles.searchContainer}>
            <View style={[styles.inputContainer, styles.row]}>
              <SearchIcon />
              <TextInput
                style={styles.input}
                placeholder="Search"
                onSubmitEditing={(event) => onSubmitSearch(event.nativeEvent.text)}
                autoFocus
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  notFound: {
    marginTop: 20,
    alignSelf: 'center'
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingTop: 10,
    paddingBottom: 20,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#dedede',
    padding: 10,
    borderRadius: 10,
    display: 'flex',
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchI: {
    paddingVertical: 10,
    marginHorizontal: 15
  },
  input: {
    marginLeft: 10,
    flex: 1,
    fontSize: 16
  },
  mainContainer: {
    paddingHorizontal: 10
  },
  cardContainer: {
    flex: 1,
    maxWidth: 155,
    height: 215,
    borderRadius: 10
  },
  posterContainer: {
    position: 'absolute',
    top: -15,
    left: -15,
    height: 215,
    width: 155,
    borderRadius: 10
  },
  menuIcon: {
    marginLeft: 20
  },
  accountIcon: {
    marginRight: 20
  },
  thumbnailContainer: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});