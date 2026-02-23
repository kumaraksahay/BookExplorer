import { StyleSheet } from 'react-native';
import { colors, spacing, typography, radius, shadow } from '../constants/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  iconButton: {
    padding: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadow.medium,
  },
  coverImage: {
    width: '100%',
    height: 400,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    alignSelf: 'center',
    backgroundColor: colors.border,
  },
  title: {
    fontSize: typography.sizes.xl,
    fontWeight: typography.weights.bold,
    color: colors.text,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  author: {
    fontSize: typography.sizes.md,
    color: colors.mutedText,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  published: {
    fontSize: typography.sizes.sm,
    color: colors.mutedText,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.sizes.lg,
    fontWeight: typography.weights.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  sectionText: {
    fontSize: typography.sizes.md,
    color: colors.mutedText,
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    backgroundColor: colors.background,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.background,
    fontSize: typography.sizes.md,
    fontWeight: typography.weights.semibold,
  },
});
