import '../styles/app.scss'
import type { AppProps } from 'next/app'
//https://www.figma.com/file/knytjAN1Sb4DYxtMLNv8xw/FIAP?node-id=1%3A78
function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
