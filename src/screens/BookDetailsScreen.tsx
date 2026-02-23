import React from 'react';
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useBookDetails } from '../hooks/useBookDetails';
import { RatingStars } from '../components/RatingStars';
import { Loader } from '../components/Loader';
import { ErrorState } from '../components/ErrorState';
import { RootStackParamList } from '../navigation/navigation.types';
import { colors } from '../constants/theme';
import { styles } from './BookDetailsScreen.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type BookDetailsRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

export const BookDetailsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<BookDetailsRouteProp>();
  const { id } = route.params;

  const { data, isLoading, error, refetch } = useBookDetails(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load book details'}
        onRetry={() => refetch()}
      />
    );
  }

  // ---- SAFETY: normalize fields so UI never breaks ----
  const title = typeof data.title === 'string' && data.title.trim().length > 0 ? data.title : 'Unknown Title';
  const authors = Array.isArray(data.authors) ? data.authors.filter(Boolean) : [];
  const authorText = authors.length > 0 ? authors.join(', ') : 'Unknown Author';

  // Try multiple possible API keys (in case your hook maps differently)
  const rawRating =
    (data as any).averageRating ??
    (data as any).avgRating ??
    (data as any).rating ??
    (data as any).average_rating ??
    0;

  const rawCount =
    (data as any).ratingsCount ??
    (data as any).ratingCount ??
    (data as any).ratings_count ??
    (data as any).reviews ??
    0;

  const parsedRating = Number(rawRating);
  const parsedCount = Number(rawCount);

  const safeRating =
    Number.isFinite(parsedRating) ? Math.max(0, Math.min(5, parsedRating)) : 0;

  const safeCount =
    Number.isFinite(parsedCount) ? Math.max(0, Math.floor(parsedCount)) : 0;

  const publishedYear =
    (data as any).publishedYear ?? (data as any).published_year ?? null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>

        <Pressable style={styles.iconButton}>
          <Ionicons name="search" size={24} color={colors.text} />
        </Pressable>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          {!!data.thumbnail && (
            <Image source={{ uri: data.thumbnail }} style={styles.coverImage} resizeMode="cover" />
          )}

          <Text style={styles.title}>{title.toUpperCase()}</Text>
          <Text style={styles.author}>{authorText}</Text>

          {!!publishedYear && (
            <Text style={styles.published}>Published in {publishedYear}</Text>
          )}

          {/* Rating always receives valid numbers */}
          <RatingStars rating={safeRating} count={safeCount} />

          {/* Optional debug (temporary) */}
          {/* <Text style={{ fontSize: 12, color: '#999', marginTop: 6 }}>
            DEBUG rating: {String(rawRating)} ({typeof rawRating}) | count: {String(rawCount)} ({typeof rawCount})
          </Text> */}

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About the author</Text>
            <Text style={styles.sectionText}>
              {authors.length > 0
                ? `${authorText} ${authors.length === 1 ? 'is' : 'are'} ${
                    authors.length === 1 ? 'a' : ''
                  } notable ${authors.length === 1 ? 'author' : 'authors'} in the literary world.`
                : 'Author information not available.'}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.sectionText}>
              {data.description || 'No overview available.'}
            </Text>
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>✓ Book Read</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaView>
  );
};