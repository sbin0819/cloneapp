import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import Script from 'next/script';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          fetch(url).then((response) => response.json()),
      }}
    >
      <div className="w-full max-w-lg mx-auto">
        <Component {...pageProps} />
      </div>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
      />
    </SWRConfig>
  );
}

export default MyApp;
