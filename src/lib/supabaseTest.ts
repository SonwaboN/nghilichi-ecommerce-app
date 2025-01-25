import { supabase } from './supabase';

export async function testConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count');
    if (error) {
      console.error('Connection failed:', error.message);
      return false;
    }
    console.log('Successfully connected to Supabase!');
    return true;
  } catch (err) {
    console.error('Connection error:', err);
    return false;
  }
}
