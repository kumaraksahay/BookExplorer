import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.sm,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: spacing.sm,
  },
  ratingText: {
    fontSize: typography.sizes.sm,
    color: colors.mutedText,
  },
  noRating: {
    fontSize: typography.sizes.sm,
    color: colors.mutedText,
    marginVertical: spacing.sm,
  },
});
