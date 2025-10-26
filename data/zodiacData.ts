
export interface ZodiacSign {
  name: string;
  symbol: string;
  dateRange: string;
  element: string;
  emoji: string;
}

export const zodiacSigns: ZodiacSign[] = [
  { name: 'Aries', symbol: '♈', dateRange: 'Mar 21 - Apr 19', element: 'Fire', emoji: '🔥' },
  { name: 'Taurus', symbol: '♉', dateRange: 'Apr 20 - May 20', element: 'Earth', emoji: '🌍' },
  { name: 'Gemini', symbol: '♊', dateRange: 'May 21 - Jun 20', element: 'Air', emoji: '💨' },
  { name: 'Cancer', symbol: '♋', dateRange: 'Jun 21 - Jul 22', element: 'Water', emoji: '💧' },
  { name: 'Leo', symbol: '♌', dateRange: 'Jul 23 - Aug 22', element: 'Fire', emoji: '🔥' },
  { name: 'Virgo', symbol: '♍', dateRange: 'Aug 23 - Sep 22', element: 'Earth', emoji: '🌍' },
  { name: 'Libra', symbol: '♎', dateRange: 'Sep 23 - Oct 22', element: 'Air', emoji: '💨' },
  { name: 'Scorpio', symbol: '♏', dateRange: 'Oct 23 - Nov 21', element: 'Water', emoji: '💧' },
  { name: 'Sagittarius', symbol: '♐', dateRange: 'Nov 22 - Dec 21', element: 'Fire', emoji: '🔥' },
  { name: 'Capricorn', symbol: '♑', dateRange: 'Dec 22 - Jan 19', element: 'Earth', emoji: '🌍' },
  { name: 'Aquarius', symbol: '♒', dateRange: 'Jan 20 - Feb 18', element: 'Air', emoji: '💨' },
  { name: 'Pisces', symbol: '♓', dateRange: 'Feb 19 - Mar 20', element: 'Water', emoji: '💧' },
];

export interface Horoscope {
  sign: string;
  date: string;
  love: string;
  advice: string;
}

export const horoscopes: Record<string, Horoscope> = {
  Aries: {
    sign: 'Aries',
    date: new Date().toLocaleDateString(),
    love: 'Today brings exciting romantic opportunities! Your passionate nature will attract someone special. Be bold and express your feelings.',
    advice: 'Take the initiative in matters of the heart. Your confidence is magnetic right now.',
  },
  Taurus: {
    sign: 'Taurus',
    date: new Date().toLocaleDateString(),
    love: 'A stable and nurturing energy surrounds your love life. Focus on building deeper connections with your partner or potential love interest.',
    advice: 'Show your affection through thoughtful gestures. Quality time together strengthens bonds.',
  },
  Gemini: {
    sign: 'Gemini',
    date: new Date().toLocaleDateString(),
    love: 'Communication is key today! Engaging conversations could spark new romantic connections or deepen existing relationships.',
    advice: 'Be open and honest about your feelings. Your words have the power to create meaningful connections.',
  },
  Cancer: {
    sign: 'Cancer',
    date: new Date().toLocaleDateString(),
    love: 'Your emotional depth draws others to you. Trust your intuition when it comes to matters of the heart.',
    advice: 'Create a cozy, intimate atmosphere for romance to flourish. Your nurturing nature is your strength.',
  },
  Leo: {
    sign: 'Leo',
    date: new Date().toLocaleDateString(),
    love: 'Your charisma is at its peak! You&apos;ll shine in social situations and attract admiration from potential partners.',
    advice: 'Let your authentic self shine through. Confidence and generosity will win hearts today.',
  },
  Virgo: {
    sign: 'Virgo',
    date: new Date().toLocaleDateString(),
    love: 'Pay attention to the small details in your relationship. Acts of service and thoughtfulness will strengthen your bond.',
    advice: 'Show love through practical support. Your caring nature doesn&apos;t go unnoticed.',
  },
  Libra: {
    sign: 'Libra',
    date: new Date().toLocaleDateString(),
    love: 'Harmony and balance are essential today. Seek partnerships that bring peace and mutual understanding.',
    advice: 'Focus on creating beautiful moments together. Your diplomatic nature helps resolve any conflicts.',
  },
  Scorpio: {
    sign: 'Scorpio',
    date: new Date().toLocaleDateString(),
    love: 'Intense emotions and deep connections are highlighted. Your magnetic presence draws others into your orbit.',
    advice: 'Embrace vulnerability and let your guard down. True intimacy requires trust and openness.',
  },
  Sagittarius: {
    sign: 'Sagittarius',
    date: new Date().toLocaleDateString(),
    love: 'Adventure and spontaneity bring excitement to your love life. Try something new with your partner or meet someone during your travels.',
    advice: 'Keep things fun and lighthearted. Your optimistic spirit is contagious and attractive.',
  },
  Capricorn: {
    sign: 'Capricorn',
    date: new Date().toLocaleDateString(),
    love: 'Building a solid foundation in relationships is your focus. Long-term commitment and loyalty are rewarded.',
    advice: 'Show your dedication through consistent actions. Your reliability is deeply appreciated.',
  },
  Aquarius: {
    sign: 'Aquarius',
    date: new Date().toLocaleDateString(),
    love: 'Unconventional connections and intellectual stimulation attract you. Embrace your unique approach to love.',
    advice: 'Be yourself and seek partners who appreciate your individuality. Friendship is the foundation of lasting love.',
  },
  Pisces: {
    sign: 'Pisces',
    date: new Date().toLocaleDateString(),
    love: 'Your romantic and dreamy nature creates magical moments. Intuition guides you to the right person.',
    advice: 'Trust your feelings and let your compassionate heart lead the way. Create enchanting experiences together.',
  },
};

export interface CompatibilityResult {
  percentage: number;
  description: string;
  strengths: string[];
  challenges: string[];
}

export const getCompatibility = (sign1: string, sign2: string): CompatibilityResult => {
  const compatibilityMatrix: Record<string, Record<string, CompatibilityResult>> = {
    Aries: {
      Aries: {
        percentage: 75,
        description: 'Two Aries together create a dynamic and passionate relationship full of energy and excitement.',
        strengths: ['High energy', 'Mutual understanding', 'Adventurous spirit'],
        challenges: ['Power struggles', 'Impulsiveness', 'Competing egos'],
      },
      Taurus: {
        percentage: 60,
        description: 'Aries and Taurus can complement each other, but patience is needed to bridge their different paces.',
        strengths: ['Balance of action and stability', 'Loyalty', 'Passionate connection'],
        challenges: ['Different speeds', 'Stubbornness', 'Communication styles'],
      },
      Gemini: {
        percentage: 85,
        description: 'Aries and Gemini share a fun, exciting connection with great communication and mutual curiosity.',
        strengths: ['Intellectual stimulation', 'Adventure', 'Social compatibility'],
        challenges: ['Lack of depth', 'Restlessness', 'Commitment issues'],
      },
      Cancer: {
        percentage: 55,
        description: 'Aries and Cancer have different emotional needs, but can learn from each other with effort.',
        strengths: ['Complementary strengths', 'Growth potential', 'Protective nature'],
        challenges: ['Emotional disconnect', 'Different priorities', 'Sensitivity clashes'],
      },
      Leo: {
        percentage: 90,
        description: 'Aries and Leo create a powerful, passionate partnership full of warmth and excitement.',
        strengths: ['Mutual admiration', 'Passion', 'Shared enthusiasm'],
        challenges: ['Ego battles', 'Need for attention', 'Dominance issues'],
      },
      Virgo: {
        percentage: 50,
        description: 'Aries and Virgo have contrasting approaches, requiring compromise and understanding.',
        strengths: ['Balance', 'Learning opportunities', 'Complementary skills'],
        challenges: ['Different values', 'Critical nature', 'Pace differences'],
      },
      Libra: {
        percentage: 70,
        description: 'Aries and Libra are opposite signs that can create a balanced and exciting relationship.',
        strengths: ['Attraction of opposites', 'Social harmony', 'Balanced perspectives'],
        challenges: ['Decision-making', 'Different approaches', 'Conflict styles'],
      },
      Scorpio: {
        percentage: 65,
        description: 'Aries and Scorpio share intense passion but need to manage their strong personalities.',
        strengths: ['Intense chemistry', 'Loyalty', 'Determination'],
        challenges: ['Power struggles', 'Jealousy', 'Control issues'],
      },
      Sagittarius: {
        percentage: 88,
        description: 'Aries and Sagittarius are a perfect match for adventure, fun, and mutual understanding.',
        strengths: ['Adventure', 'Optimism', 'Freedom-loving'],
        challenges: ['Lack of grounding', 'Impulsiveness', 'Commitment fears'],
      },
      Capricorn: {
        percentage: 58,
        description: 'Aries and Capricorn have different approaches but can achieve great things together.',
        strengths: ['Ambition', 'Determination', 'Goal-oriented'],
        challenges: ['Different paces', 'Work-life balance', 'Emotional expression'],
      },
      Aquarius: {
        percentage: 78,
        description: 'Aries and Aquarius share independence and innovation, creating an exciting partnership.',
        strengths: ['Independence', 'Innovation', 'Intellectual connection'],
        challenges: ['Emotional distance', 'Unpredictability', 'Commitment issues'],
      },
      Pisces: {
        percentage: 62,
        description: 'Aries and Pisces can complement each other but need to bridge their different worlds.',
        strengths: ['Complementary nature', 'Creativity', 'Growth potential'],
        challenges: ['Different realities', 'Sensitivity', 'Communication gaps'],
      },
    },
  };

  // For simplicity, I'll create a symmetric matrix by calculating compatibility
  const getSymmetricCompatibility = (s1: string, s2: string): CompatibilityResult => {
    if (compatibilityMatrix[s1] && compatibilityMatrix[s1][s2]) {
      return compatibilityMatrix[s1][s2];
    }
    if (compatibilityMatrix[s2] && compatibilityMatrix[s2][s1]) {
      return compatibilityMatrix[s2][s1];
    }

    // Default compatibility for pairs not explicitly defined
    const elements1 = zodiacSigns.find(z => z.name === s1)?.element || '';
    const elements2 = zodiacSigns.find(z => z.name === s2)?.element || '';
    
    let percentage = 70;
    if (elements1 === elements2) {
      percentage = 80;
    } else if (
      (elements1 === 'Fire' && elements2 === 'Air') ||
      (elements1 === 'Air' && elements2 === 'Fire') ||
      (elements1 === 'Earth' && elements2 === 'Water') ||
      (elements1 === 'Water' && elements2 === 'Earth')
    ) {
      percentage = 75;
    }

    return {
      percentage,
      description: `${s1} and ${s2} can create a harmonious relationship with mutual understanding and respect.`,
      strengths: ['Mutual respect', 'Balanced energy', 'Growth potential'],
      challenges: ['Different perspectives', 'Communication needs', 'Compromise required'],
    };
  };

  return getSymmetricCompatibility(sign1, sign2);
};
