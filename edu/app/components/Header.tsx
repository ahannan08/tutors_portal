import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useEnhancedUser } from '../context/EnhancedUserContext';
import { useAuth } from '@clerk/clerk-expo';

export default function Header() {
  const { enhancedUser } = useEnhancedUser();
  const { signOut } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Hello,</Text>
        <Text style={styles.nameText}>
          {enhancedUser?.firstName || 'Guest'}
        </Text>
      </View>

      {enhancedUser?.profileImage && (
        <Image
          source={{ uri: enhancedUser.profileImage }}
          style={styles.profileImage}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
}); 