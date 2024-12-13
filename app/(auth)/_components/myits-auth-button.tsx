'use client';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { redirect } from 'next/navigation';

export default function MyITSSignInButton() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const BASE_URI = process.env.NEXT_PUBLIC_BACKEND_URL;
  const APP_URI = process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    const fetchCredentials = async () => {
      try {
        const response = await axios.get(`${BASE_URI}/openid`, {
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
        try {
          const response = await axios.post(`${BASE_URI}/openid/token`, {
            code
          });
          const { data } = response.data;
          Cookies.set('auth_token', data.token, { expires: 1 });
          redirect('/dashboard/overview');
        } catch (error) {
          console.error('Error fetching token:', error);
        }
        setLoading(false);
      }
    };
    fetchToken();
  }, [searchParams]);

  const signIn = async () => {
    if (!credentials) {
      console.error('OAuth credentials are not available.');
      return;
    }
    const { client_id, redirect_uri, state, nonce } = credentials;
    const url = `${APP_URI}/id/signin?clientId=${encodeURIComponent(
      client_id
    )}&responseType=code&scope=openid&redirectUri=${encodeURIComponent(
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
