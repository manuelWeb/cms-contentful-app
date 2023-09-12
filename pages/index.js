import Container from '../components/container'
import Layout from '../components/layout'
import { getAllPostsForHome } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ preview, }) {

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{`Next.js example with ${CMS_NAME}`}</title>
        </Head>

        <Container>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
            Home.
          </h1>

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false, }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  // console.log('preview', preview);
  // console.log('getAllPostsForHome', allPosts);

  return {
    props: { preview, allPosts },
  }
}
