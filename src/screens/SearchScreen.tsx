import React, { useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDebounce } from '../hooks/useDebounce';
import { useSearchBooks } from '../hooks/useSearchBooks';
import { SearchBar } from '../components/SearchBar';
import { BookListItem } from '../components/BookListItem';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';
import { BookSummary } from '../types/book.types';
import { RootStackParamList } from '../navigation/navigation.types';
import { styles } from './SearchScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);
  const { data, isLoading, error, refetch } = useSearchBooks(debouncedQuery);

  const renderItem = ({ item }: { item: BookSummary }) => (
    <BookListItem
      book={item}
      onPress={() => navigation.navigate('BookDetails', { id: item.id })}
    />
  );

  const renderEmpty = () => {
    if (query.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Start typing to search books</Text>
        </View>
      );
    }
    if (debouncedQuery.length >= 2 && !isLoading && (!data || data.length === 0)) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No results found</Text>
        </View>
      );
    }
    return null;
  };

  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Search Book</Text>
        </View>
        <View style={styles.searchBarContainer}>
          <SearchBar value={query} onChangeText={setQuery} />
        </View>
        <ErrorState message={error.message} onRetry={() => refetch()} />
      </View>
    );
  }

  const books = data || [];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Search Book</Text>
      </View>
      <View style={styles.searchBarContainer}>
        <SearchBar value={query} onChangeText={setQuery} />
      </View>
      {isLoading && debouncedQuery.length >= 2 ? (
        <Loader />
      ) : (
        <FlatList
          data={books}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={books.length === 0 ? styles.listContent : undefined}
        />
      )}
    </View>
  );
};
