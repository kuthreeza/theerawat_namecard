import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/kuthreeza/theerawat_namecard/main/theerawat.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProfiles(data))
      .catch(error => {
        console.error('Fetch error:', error.message);
        setError('Error: ' + error.message);
      });
  }, []);

  return (
    <View style={styles.body}>
      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : profiles.length > 0 ? (
        profiles.map((profile, index) => (
          <View key={index} style={styles.card}>
            <Image
              source={{ uri: profile.image }}
              style={styles.profileImg}
            />
            <Text style={styles.name}>{profile.name}</Text>
            <Text style={styles.title}>{profile.title}</Text>
            <Text style={styles.detail}>Phone: {profile.phone}</Text>
            <Text style={styles.detail}>Email: {profile.email}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    width: 250,
    borderRadius: 12,
    elevation: 4, // for shadow on Android
    shadowColor: '#000', // for shadow on iOS
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    alignItems: 'center',
  },
  profileImg: {
    borderRadius: 50,
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    color: '#555',
    marginBottom: 10,
  },
  detail: {
    color: '#555',
    fontSize: 14,
    marginBottom: 5,
  },
  loading: {
    fontSize: 16,
    color: '#555',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});