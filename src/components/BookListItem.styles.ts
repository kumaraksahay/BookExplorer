import { StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.medium,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  author: {
    fontSize: typography.sizes.sm,
    color: colors.mutedText,
  },
});
