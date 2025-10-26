
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Pressable, Platform } from 'react-native';
import { Stack } from 'expo-router';
import { colors, commonStyles } from '@/styles/commonStyles';
import { zodiacSigns, getCompatibility } from '@/data/zodiacData';

export default function CompatibilityScreen() {
  const [sign1, setSign1] = useState<string>('Aries');
  const [sign2, setSign2] = useState<string>('Leo');
  const [showResult, setShowResult] = useState(false);

  const compatibility = getCompatibility(sign1, sign2);

  const handleCalculate = () => {
    setShowResult(true);
  };

  const getCompatibilityColor = (percentage: number): string => {
    if (percentage >= 80) return colors.highlight;
    if (percentage >= 60) return colors.accent;
    return colors.textSecondary;
  };

  const getCompatibilityLabel = (percentage: number): string => {
    if (percentage >= 80) return 'Excellent Match!';
    if (percentage >= 60) return 'Good Compatibility';
    return 'Needs Work';
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Compatibility',
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
            <Text style={styles.headerTitle}>💑 Love Compatibility 💑</Text>
            <Text style={styles.headerSubtitle}>Discover how well two signs match in love</Text>
          </View>

          <View style={[commonStyles.card, styles.selectionCard]}>
            <View style={styles.signSelector}>
              <Text style={styles.selectorLabel}>First Sign</Text>
              <View style={styles.signDisplay}>
                <Text style={styles.signDisplaySymbol}>
                  {zodiacSigns.find(z => z.name === sign1)?.symbol}
                </Text>
                <Text style={styles.signDisplayName}>{sign1}</Text>
              </View>
              <View style={styles.signGrid}>
                {zodiacSigns.map((sign) => (
                  <Pressable
                    key={sign.name}
                    style={[
                      styles.miniZodiacButton,
                      sign1 === sign.name && styles.miniZodiacButtonActive,
                    ]}
                    onPress={() => {
                      setSign1(sign.name);
                      setShowResult(false);
                    }}
                  >
                    <Text style={styles.miniZodiacSymbol}>{sign.symbol}</Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.heartDivider}>
              <Text style={styles.heartIcon}>❤️</Text>
            </View>

            <View style={styles.signSelector}>
              <Text style={styles.selectorLabel}>Second Sign</Text>
              <View style={styles.signDisplay}>
                <Text style={styles.signDisplaySymbol}>
                  {zodiacSigns.find(z => z.name === sign2)?.symbol}
                </Text>
                <Text style={styles.signDisplayName}>{sign2}</Text>
              </View>
              <View style={styles.signGrid}>
                {zodiacSigns.map((sign) => (
                  <Pressable
                    key={sign.name}
                    style={[
                      styles.miniZodiacButton,
                      sign2 === sign.name && styles.miniZodiacButtonActive,
                    ]}
                    onPress={() => {
                      setSign2(sign.name);
                      setShowResult(false);
                    }}
                  >
                    <Text style={styles.miniZodiacSymbol}>{sign.symbol}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          <Pressable
            style={[styles.calculateButton, { backgroundColor: colors.secondary }]}
            onPress={handleCalculate}
          >
            <Text style={styles.calculateButtonText}>Calculate Compatibility</Text>
          </Pressable>

          {showResult && (
            <>
              <View style={[commonStyles.card, styles.resultCard]}>
                <View style={styles.percentageContainer}>
                  <View
                    style={[
                      styles.percentageCircle,
                      { borderColor: getCompatibilityColor(compatibility.percentage) },
                    ]}
                  >
                    <Text
                      style={[
                        styles.percentageText,
                        { color: getCompatibilityColor(compatibility.percentage) },
                      ]}
                    >
                      {compatibility.percentage}%
                    </Text>
                  </View>
                  <Text style={styles.compatibilityLabel}>
                    {getCompatibilityLabel(compatibility.percentage)}
                  </Text>
                </View>
                <Text style={styles.descriptionText}>{compatibility.description}</Text>
              </View>

              <View style={[commonStyles.card, styles.detailCard]}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailIcon}>✨</Text>
                  <Text style={styles.detailTitle}>Strengths</Text>
                </View>
                {compatibility.strengths.map((strength, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listItemText}>{strength}</Text>
                  </View>
                ))}
              </View>

              <View style={[commonStyles.card, styles.detailCard, { backgroundColor: colors.accent }]}>
                <View style={styles.detailHeader}>
                  <Text style={styles.detailIcon}>⚠️</Text>
                  <Text style={styles.detailTitle}>Challenges</Text>
                </View>
                {compatibility.challenges.map((challenge, index) => (
                  <View key={index} style={styles.listItem}>
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.listItemText}>{challenge}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
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
  selectionCard: {
    marginBottom: 16,
  },
  signSelector: {
    marginBottom: 16,
  },
  selectorLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  signDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  signDisplaySymbol: {
    fontSize: 40,
    marginRight: 12,
  },
  signDisplayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.card,
  },
  signGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  miniZodiacButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.background,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  miniZodiacButtonActive: {
    borderColor: colors.highlight,
    backgroundColor: colors.highlight,
  },
  miniZodiacSymbol: {
    fontSize: 20,
  },
  heartDivider: {
    alignItems: 'center',
    marginVertical: 8,
  },
  heartIcon: {
    fontSize: 32,
  },
  calculateButton: {
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    boxShadow: '0px 4px 12px rgba(46, 41, 78, 0.15)',
    elevation: 3,
  },
  calculateButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.card,
  },
  resultCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  percentageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  percentageCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  percentageText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  compatibilityLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text,
    textAlign: 'center',
  },
  detailCard: {
    marginBottom: 16,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingLeft: 8,
  },
  bullet: {
    fontSize: 16,
    color: colors.text,
    marginRight: 8,
    fontWeight: 'bold',
  },
  listItemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
    lineHeight: 22,
  },
});
