// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
// import dotenv from "dotenv";

// dotenv.config();
export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="referrer" content="origin" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta property="site_name" content="HackerNews-SolidStart" />
          <link rel="icon" href="/favicon.ico" />
          <title>Hacker News Clone</title>
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
