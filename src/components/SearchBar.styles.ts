import { StyleSheet } from 'react-native';
import { colors, spacing, radius, typography, shadow } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.small,
  },
  icon: {
    color: colors.mutedText,
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.sizes.md,
    color: colors.text,
    paddingVertical: spacing.xs,
  },
});
