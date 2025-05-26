import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { supabase } from '../lib/supabase';

export default function AddExpense() {
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [payer, setPayer] = useState<'you' | 'someone'>('you');

  const handleAddExpense = async () => {
    if (!amount || !description || !recipient) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }

    const newExpense = {
      amount: parseFloat(amount),
      description,
      group: recipient,
      payer,
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from('expenses').insert([newExpense]);

    if (error) {
      console.error('❌ Supabase error:', error);
      Alert.alert('Error', 'Could not save expense.');
      return;
    }

    Alert.alert('Expense Added', `💸 $${amount} for ${description}`);
    setAmount('');
    setDescription('');
    setRecipient('');
    setPayer('you');
    setTimeout(() => router.back(), 700);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/office/80/money.png' }}
          style={styles.image}
        />
        <Text style={styles.title}>Add New Expense</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>💰 Amount</Text>
          <View style={styles.amountInputWrapper}>
            <Text style={styles.currency}>$</Text>
            <TextInput
              placeholder="e.g. 50"
              keyboardType="numeric"
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
            />
          </View>

          <Text style={styles.label}>📝 Description</Text>
          <TextInput
            placeholder="e.g. Coffee, Taxi"
            style={styles.input}
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>👤 Group or Person</Text>
          <TextInput
            placeholder="e.g. Roommates or Sarah"
            style={styles.input}
            value={recipient}
            onChangeText={setRecipient}
          />

          <Text style={styles.label}>👛 Who paid?</Text>
          <View style={styles.amountInputWrapper}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                payer === 'you' && styles.toggleButtonSelected,
              ]}
              onPress={() => setPayer('you')}
            >
              <Text style={styles.toggleText}>I paid</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                payer === 'someone' && styles.toggleButtonSelected,
              ]}
              onPress={() => setPayer('someone')}
            >
              <Text style={styles.toggleText}>Someone else</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleAddExpense}>
          <Text style={styles.buttonText}>➕ Add Expense</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    paddingTop: 60,
  },
  image: {
    width: 80,
    height: 80,
    alignSelf: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginTop: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  amountInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 8,
  },
  currency: {
    fontSize: 16,
    marginRight: 8,
    color: '#444',
  },
  amountInput: {
    fontSize: 16,
    flex: 1,
  },
  toggleButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
  },
  toggleButtonSelected: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  toggleText: {
    color: '#000',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 32,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
