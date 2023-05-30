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

        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? []
  return {
    props: { preview, allPosts },
  }
}
