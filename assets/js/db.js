import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wydckdfvxzvsgxlljlpq.supabase.co';
const supabaseKey = 'sb_publishable_WxaIUa4iYql0KT_fe9L5mQ_AWrGe_u0';

// Exporting the configured Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Async function to fetch from the requested table
export async function getYazarlar() {
    // Using user requested table name: Yemeklerr (as established previously)
    const { data, error } = await supabase.from('Yemeklerr').select('*');

    if (error) {
        console.error('Hata:', error.message);
        return [];
    }

    return data;
}
