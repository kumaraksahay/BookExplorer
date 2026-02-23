import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import { styles } from './RatingStars.styles';

export interface RatingStarsProps {
  rating: number | string | null | undefined;
  count: number | string | null | undefined;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, count }) => {
  // Convert to safe numbers
  const parsedRating = Number(rating);
  const parsedCount = Number(count);

  const safeRating = Number.isFinite(parsedRating)
    ? Math.max(0, Math.min(5, parsedRating))
    : 0;

  const safeCount = Number.isFinite(parsedCount) && parsedCount > 0
    ? Math.floor(parsedCount)
    : 0;

  // If truly no rating data
  if (rating === null || rating === undefined || !Number.isFinite(parsedRating)) {
    return <Text style={styles.noRating}>No ratings</Text>;
  }

  // Round to nearest 0.5
  const roundedRating = Math.round(safeRating * 2) / 2;

  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating - fullStars === 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <View style={styles.container}>
      <View style={styles.starsContainer}>
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, index) => (
          <Ionicons
            key={`full-${index}`}
            name="star"
            size={20}
            color={colors.warning}
          />
        ))}

        {/* Half Star */}
        {hasHalfStar && (
          <Ionicons
            name="star-half"
            size={20}
            color={colors.warning}
          />
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, index) => (
          <Ionicons
            key={`empty-${index}`}
            name="star-outline"
            size={20}
            color={colors.warning}
          />
        ))}
      </View>

      <Text style={styles.ratingText}>
        ({safeRating.toFixed(1)}) ({safeCount} reviews)
      </Text>
    </View>
  );
};