'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function MyITSSignInButton() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/auth/oauths`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setCredentials(response.data.data);
      } catch (error) {
        console.error('Error fetching OAuth credentials:', error);
      }
    };
    fetchCredentials();
  }, []);

  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParams.get('code');
      console.log('Code:', code);
      if (code) {
        setLoading(true);
        const urlParams = new URLSearchParams();
        urlParams.append('code', code);

        await axios.post(`${BASE_URI}/auth/oauths/token`, {
          code
        });
        setLoading(false);
      }
    };
    fetchToken();
  }, []);

  const signIn = async () => {
    if (!credentials) {
      console.error('OAuth credentials are not available.');
      return;
    }
    const { client_id, redirect_uri, state, nonce } = credentials;

    const url = `http://my.its.ac.id.localhost/en/signin?client_id=${encodeURIComponent(
      client_id
    )}&response_type=code&scope=openid&redirect_uri=${encodeURIComponent(
      redirect_uri
    )}&nonce=${encodeURIComponent(nonce)}&state=${encodeURIComponent(state)}`;

    window.location.href = url;
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Button
          className="w-full"
          variant="outline"
          type="button"
          onClick={signIn}
        >
          Continue with MyITS Account
        </Button>
      )}
    </>
  );
}
