import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { styles } from './Loader.styles';
import { colors } from '../constants/theme';

export const Loader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
};
