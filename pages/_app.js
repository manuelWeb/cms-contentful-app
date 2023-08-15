import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  // If page layout is available, use it. Else return the page
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(<Component {...pageProps} />)
}

export default MyApp
