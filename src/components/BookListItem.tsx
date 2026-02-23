import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './BookListItem.styles';
import { BookSummary } from '../types/book.types';

export interface BookListItemProps {
  book: BookSummary;
  onPress: () => void;
}

export const BookListItem = React.memo<BookListItemProps>(({ book, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>{book.authorLine}</Text>
    </Pressable>
  );
});

BookListItem.displayName = 'BookListItem';
