
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, Pressable, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { IconSymbol } from '@/components/IconSymbol';
import { colors, commonStyles } from '@/styles/commonStyles';
import { zodiacSigns } from '@/data/zodiacData';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [selectedSign, setSelectedSign] = useState<string>('Aries');
  const [name, setName] = useState<string>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const savedSign = await AsyncStorage.getItem('zodiacSign');
      const savedName = await AsyncStorage.getItem('userName');
      if (savedSign) setSelectedSign(savedSign);
      if (savedName) setName(savedName);
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('zodiacSign', selectedSign);
      await AsyncStorage.setItem('userName', name);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.log('Error saving profile:', error);
    }
  };

  const zodiacInfo = zodiacSigns.find(z => z.name === selectedSign);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Profile',
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
            <Text style={styles.headerTitle}>✨ Your Astrological Profile ✨</Text>
            <Text style={styles.headerSubtitle}>Set up your zodiac information</Text>
          </View>

          <View style={[commonStyles.card, styles.profileCard]}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Text style={styles.avatarSymbol}>{zodiacInfo?.symbol}</Text>
              </View>
            </View>

            <View style={styles.inputSection}>
              <Text style={styles.inputLabel}>Your Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.textSecondary}
              />
            </View>

            <View style={styles.signSection}>
              <Text style={styles.sectionTitle}>Your Zodiac Sign</Text>
              <View style={styles.selectedSignDisplay}>
                <Text style={styles.selectedSignSymbol}>{zodiacInfo?.symbol}</Text>
                <View style={styles.selectedSignInfo}>
                  <Text style={styles.selectedSignName}>{selectedSign}</Text>
                  <Text style={styles.selectedSignDate}>{zodiacInfo?.dateRange}</Text>
                  <View style={styles.elementBadge}>
                    <Text style={styles.elementEmoji}>{zodiacInfo?.emoji}</Text>
                    <Text style={styles.elementText}>{zodiacInfo?.element}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

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

          <Pressable
            style={[styles.saveButton, saved && styles.saveButtonSuccess]}
            onPress={saveProfile}
          >
            <Text style={styles.saveButtonText}>
              {saved ? '✓ Saved!' : 'Save Profile'}
            </Text>
          </Pressable>

          <View style={[commonStyles.card, styles.infoCard]}>
            <Text style={styles.infoTitle}>About {selectedSign}</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Element:</Text>
              <Text style={styles.infoValue}>{zodiacInfo?.element} {zodiacInfo?.emoji}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Date Range:</Text>
              <Text style={styles.infoValue}>{zodiacInfo?.dateRange}</Text>
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
  profileCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: colors.primary,
  },
  avatarSymbol: {
    fontSize: 48,
  },
  inputSection: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  signSection: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  selectedSignDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
  },
  selectedSignSymbol: {
    fontSize: 48,
    marginRight: 16,
  },
  selectedSignInfo: {
    flex: 1,
  },
  selectedSignName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.card,
    marginBottom: 4,
  },
  selectedSignDate: {
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
    fontSize: 14,
    marginRight: 6,
  },
  elementText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.card,
  },
  zodiacGrid: {
    marginBottom: 20,
  },
  gridTitle: {
    fontSize: 18,
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
  saveButton: {
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    boxShadow: '0px 4px 12px rgba(46, 41, 78, 0.15)',
    elevation: 3,
  },
  saveButtonSuccess: {
    backgroundColor: colors.highlight,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
  },
  infoCard: {
    backgroundColor: colors.accent,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  infoValue: {
    fontSize: 16,
    color: colors.text,
  },
});
