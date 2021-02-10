/* eslint-disable jsx-a11y/anchor-is-valid */
import type { FC } from 'react'

import useSWR from 'swr'
import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { Auth, Card, Typography, Space, Button, Icon } from '@supabase/ui'
import { useColorModeValue, Box } from '@chakra-ui/react'
import { FaArrowLeft } from 'react-icons/fa'

import { supabase } from '@lib/supabase'

type AuthView = 'sign_in' | 'sign_up' | 'forgotten_password' | 'magic_link'

const fetcher = (url, token) =>
  fetch(url, {
    method: 'GET',
    headers: new Headers({ 'Content-Type': 'application/json', token }),
    credentials: 'same-origin',
  }).then((res) => res.json())

const LoginForm: FC = () => {
  const bg = useColorModeValue('brand.500', 'whiteAlpha.500')
  const color = useColorModeValue('whiteAlpha.500', 'brand.500')

  const { user, session } = Auth.useUser()
  const { data, error } = useSWR(session ? ['/api/getUser', session.access_token] : null, fetcher)
  const [authView, setAuthView] = useState<AuthView>('sign_in')

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') setAuthView('forgotten_password')
      if (event === 'USER_UPDATED') setTimeout(() => setAuthView('sign_in'), 1000)
      // Send session to /api/auth route to set the auth cookie.
      // NOTE: this is only needed if you're doing SSR (getServerSideProps)!
      fetch('/api/auth', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json())
    })

    return () => {
      authListener.unsubscribe()
    }
  }, [])

  if (!user)
    return (
      <Space direction="vertical" size={8}>
        <Auth
          supabaseClient={supabase}
          providers={['google', 'github']}
          view={authView}
          socialLayout="horizontal"
          socialButtonSize="xlarge"
        />
      </Space>
    )

  return (
    <Box maxWidth="420px" margin="96px auto">
      <Card>
        <Space direction="vertical" size={6}>
          {authView === 'forgotten_password' && <Auth.UpdatePassword supabaseClient={supabase} />}
          {user && (
            <>
              <Typography.Text>You're signed in</Typography.Text>
              <Typography.Text strong>Email: {user.email}</Typography.Text>

              <Button
                icon={<Icon src={FaArrowLeft} type="LogOut" />}
                type="outline"
                onClick={() => supabase.auth.signOut()}
              >
                Log out
              </Button>
              {error && <Typography.Text type="danger">Failed to fetch user!</Typography.Text>}
              {data && !error ? (
                <>
                  <Typography.Text type="success">User data retrieved server-side (in API route):</Typography.Text>

                  <Typography.Text>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </Typography.Text>
                </>
              ) : (
                <div>Loading...</div>
              )}

              <Typography.Text>
                <NextLink href="/profile">
                  <a>SSR example with getServerSideProps</a>
                </NextLink>
              </Typography.Text>
            </>
          )}
        </Space>
      </Card>
    </Box>
  )
}

export default LoginForm

// export type { Props as LoginFormProps }
