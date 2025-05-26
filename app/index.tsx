import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';
import { Expense } from '../types/expenses';
export default function HomeScreen() {
  const router = useRouter();
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useFocusEffect(
  useCallback(() => {
    const fetchExpenses = async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Supabase fetch error:', error);
      } else {
        setExpenses(data || []);
      }
    };

    fetchExpenses();
  }, [])
);

  const renderItem = ({ item }: { item: Expense }) => {
    const isYouPaid = item.payer === 'you';
    const amount = item.amount || 0;

    return (
      <View style={styles.card}>
        <Text style={styles.groupName}>{`${item.group}: ${item.description}`}</Text>
        <Text style={{ color: isYouPaid ? 'green' : 'red' }}>
          {isYouPaid
            ? `You’re owed $${amount.toFixed(2)}`
            : `You owe $${amount.toFixed(2)}`}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://img.icons8.com/fluency/96/money.png' }}
        style={styles.image}
      />
      <Text style={styles.title}>Split with Ease</Text>
      <Text style={styles.subtitle}>
        Share expenses with friends, roommates, or travel buddies — fairly and effortlessly.
      </Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push('/add-expense' as const)}
      >
        <Text style={styles.addButtonText}>+ Add Expense</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 8,
  },
  image: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    marginBottom: 16,
  },
  card: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginBottom: 12,
  },
  groupName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
