import React from 'react'
import Container from '../../components/container'
import MoreStories from '../../components/more-stories'
import HeroPost from '../../components/hero-post'
import Intro from '../../components/intro'
import Layout from '../../components/layout'
import { getAllPostsForHome } from '../../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import BlogLayout from '../../components/blog-layout'

const Blog = ({ preview, allPosts }) => {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Head>
        <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
      </Head>
      <Container>
        <Intro />
        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </>
  );
};

export default Blog;

Blog.getLayout = function getLayout(page) {
  const { preview, allPosts } = page.props

  return (
    <Layout preview={preview}>
      <BlogLayout allPosts={allPosts}>{page}</BlogLayout>
    </Layout>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
    revalidate: 1,
  }
}