import Document, {Head, Html, Main, NextScript} from "next/document";
// This is the headquarters of my project, we don't usually code here,
// this is the root file, we use it as minimal as possibe since it has access to literally everything
// but we import shit from other files here (functions)
export default class MyDocument extends Document {
    render(){
        // unline the _app.tsx file, here it's only for the client side (the inspect page source)
        // no js is run here, this is only a renderer for the root page
        // the js is used only in the pages
        
        return (
          <Html lang="en">
            <Head>
              {/* <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="A simple blog" />
                    <meta name="author" content="Rami Maalouf" /> */}
            </Head>
            <body>
              <Main />
            </body>
            <NextScript />
          </Html>
        );
    }
}