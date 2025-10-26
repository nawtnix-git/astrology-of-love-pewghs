
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { Stack, Link } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { zodiacSigns, horoscopes } from '@/data/zodiacData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');

  useEffect(() => {
    loadSavedSign();
  }, []);

  const loadSavedSign = async () => {
    try {
      const saved = await AsyncStorage.getItem('zodiacSign');
      if (saved) {
        setSelectedSign(saved);
      }
    } catch (error) {
      console.log('Error loading saved sign:', error);
    }
  };

  const horoscope = horoscopes[selectedSign];
  const zodiacInfo = zodiacSigns.find(z => z.name === selectedSign);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Love Horoscope',
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
        }}
      />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={[
            styles.contentContainer,
            Platform.OS !== 'ios' && styles.contentContainerWithTabBar
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>✨ Daily Love Horoscope ✨</Text>
            <Text style={styles.headerSubtitle}>Discover what the stars have in store for your love life</Text>
          </View>

          <View style={[commonStyles.card, styles.signCard]}>
            <View style={styles.signHeader}>
              <Text style={styles.signSymbol}>{zodiacInfo?.symbol}</Text>
              <View style={styles.signInfo}>
                <Text style={styles.signName}>{selectedSign}</Text>
                <Text style={styles.signDate}>{zodiacInfo?.dateRange}</Text>
                <View style={styles.elementBadge}>
                  <Text style={styles.elementEmoji}>{zodiacInfo?.emoji}</Text>
                  <Text style={styles.elementText}>{zodiacInfo?.element}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={[commonStyles.card, styles.horoscopeCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>💕</Text>
              <Text style={styles.cardTitle}>Love Forecast</Text>
            </View>
            <Text style={styles.horoscopeText}>{horoscope.love}</Text>
          </View>

          <View style={[commonStyles.card, styles.adviceCard]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardIcon}>💫</Text>
              <Text style={styles.cardTitle}>Advice for Today</Text>
            </View>
            <Text style={styles.horoscopeText}>{horoscope.advice}</Text>
          </View>

          <Link href="/(tabs)/compatibility" asChild>
            <Pressable style={styles.compatibilityButton}>
              <Text style={styles.compatibilityIcon}>💑</Text>
              <View style={styles.compatibilityTextContainer}>
                <Text style={styles.compatibilityButtonTitle}>Check Compatibility</Text>
                <Text style={styles.compatibilityButtonSubtitle}>Find your perfect match</Text>
              </View>
              <IconSymbol name="chevron.right" size={20} color={colors.textSecondary} />
            </Pressable>
          </Link>

          <View style={styles.zodiacGrid}>
            <Text style={styles.gridTitle}>Select Your Sign</Text>
            <View style={styles.grid}>
              {zodiacSigns.map((sign) => (
                <Pressable
                  key={sign.name}
                  style={[
                    styles.zodiacButton,
                    selectedSign === sign.name && styles.zodiacButtonActive,
                  ]}
                  onPress={() => setSelectedSign(sign.name)}
                >
                  <Text style={styles.zodiacSymbol}>{sign.symbol}</Text>
                  <Text style={[
                    styles.zodiacName,
                    selectedSign === sign.name && styles.zodiacNameActive,
                  ]}>
                    {sign.name}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  contentContainerWithTabBar: {
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  signCard: {
    marginBottom: 16,
    backgroundColor: colors.secondary,
  },
  signHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signSymbol: {
    fontSize: 64,
    marginRight: 20,
  },
  signInfo: {
    flex: 1,
  },
  signName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.card,
    marginBottom: 4,
  },
  signDate: {
    fontSize: 14,
    color: colors.primary,
    marginBottom: 8,
  },
  elementBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  elementEmoji: {
    fontSize: 16,
    marginRight: 6,
  },
  elementText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  horoscopeCard: {
    marginBottom: 16,
  },
  adviceCard: {
    marginBottom: 16,
    backgroundColor: colors.accent,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  horoscopeText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
  },
  compatibilityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(46, 41, 78, 0.1)',
    elevation: 3,
  },
  compatibilityIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  compatibilityTextContainer: {
    flex: 1,
  },
  compatibilityButtonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  compatibilityButtonSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  zodiacGrid: {
    marginTop: 8,
  },
  gridTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  zodiacButton: {
    width: '23%',
    aspectRatio: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    boxShadow: '0px 2px 8px rgba(46, 41, 78, 0.08)',
    elevation: 2,
  },
  zodiacButtonActive: {
    backgroundColor: colors.highlight,
  },
  zodiacSymbol: {
    fontSize: 28,
    marginBottom: 4,
  },
  zodiacName: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  zodiacNameActive: {
    color: colors.card,
  },
});
