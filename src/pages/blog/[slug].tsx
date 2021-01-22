import type { GetStaticProps, GetStaticPaths } from 'next'

// import ErrorPage from 'next/error'
import { getDataHooksProps } from 'next-data-hooks'

import BlogPost from '@routes/BlogPost'
import sanity from '@lib/sanity/client'

export const getStaticProps: GetStaticProps = async (context) => {
  const dataHooksProps = await getDataHooksProps({
    context,
    dataHooks: BlogPost.dataHooks,
  })

  return {
    props: {
      ...dataHooksProps,
    },
    revalidate: 1,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await sanity.getAll('post')
  const paths = posts.map((post) => `/blog/${post.slug.current}`)

  return {
    paths,
    fallback: false,
  }
}

export default BlogPost