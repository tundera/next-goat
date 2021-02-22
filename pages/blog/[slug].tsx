import type { GetStaticPaths, GetStaticProps } from 'next'
import type { FrontMatter } from 'content/types'
import type { CustomNextPage as NextPage } from 'types'

import fs from 'fs'
import path from 'path'
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

import { useRouter } from 'next/router'
import { Stack, Text, Flex } from '@chakra-ui/react'
import { NextSeo } from 'next-seo'
import { MDXProvider } from '@mdx-js/react'

import { getLayout } from '@components/layouts/SiteLayout'
import LoadingSpinner from '@components/utility/suspense/LoadingSpinner'
import { mdxComponents } from '@components/mdx'
import { getContentFile } from '@lib/content'

interface Props {
  post: any
  frontMatter: FrontMatter
}

const cwd = process.cwd()

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pageSlug = params?.slug as string

  const { slug, content, frontMatter } = await getContentFile('posts', pageSlug)

  if (slug !== pageSlug || !content) {
    return {
      notFound: true,
    }
  }

  const post = await renderToString(content, {
    components: mdxComponents,
    mdxOptions: {
      remarkPlugins: [
        require('remark-slug'),
        require('remark-code-titles'),
        require('remark-toc'),
        require('remark-external-links'),
      ],
      rehypePlugins: [require('rehype-autolink-headings'), require('mdx-prism')],
      compilers: [],
    },
    scope: {},
  })

  return {
    props: {
      post,
      frontMatter,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: fs.readdirSync(path.join(cwd, 'content', 'posts')).map((p) => ({
      params: {
        slug: p.replace(/\.mdx?/, ''),
      },
    })),
    fallback: 'blocking',
  }
}

const PostPage: NextPage<Props> = ({ post, frontMatter }) => {
  const router = useRouter()

  const renderedContent = hydrate(post ?? '', { components: mdxComponents })
  const blogUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${router.pathname}`

  if (router.isFallback) {
    return (
      <>
        <Flex flexDir="column" alignItems="center">
          <LoadingSpinner />
        </Flex>
      </>
    )
  }

  return (
    <>
      <NextSeo
        openGraph={{
          title: `Tundera Dev | ${frontMatter.title}`,
          description: frontMatter.summary,
          url: blogUrl,
          type: 'article',
          article: {
            publishedTime: frontMatter.publishedAt,
            authors: [frontMatter.author],
            tags: frontMatter.tags,
          },
          images: [
            {
              url: frontMatter.image,
              width: 500,
              height: 300,
              alt: `${frontMatter.title} article cover image`,
            },
          ],
        }}
      />
      <Flex color="blackAlpha.800" bg="whiteAlpha.900" alignItems="center" justifyContent="center">
        <Stack
          as="article"
          spacing={8}
          justifyContent="center"
          alignItems="start"
          m="0 auto 4rem auto"
          w={{ base: '100%', lg: '650px' }}
        >
          <Text fontSize="6xl" fontWeight="extrabold">
            {frontMatter.title}
          </Text>
          <Flex flexDir="column" alignItems="center" position="relative">
            <img src={frontMatter.image} alt={frontMatter.title} />
          </Flex>
          <Text color="blackAlpha.800" fontWeight="bold">
            {frontMatter.author} {' • '} {frontMatter.publishedAt}
          </Text>
          <MDXProvider components={mdxComponents}>{renderedContent}</MDXProvider>
        </Stack>
      </Flex>
    </>
  )
}

PostPage.getLayout = getLayout

export default PostPage
