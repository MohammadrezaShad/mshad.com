import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import { useContext } from "react";
import StylesContext from "~/context/styles-context";

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

function Document({
  children,
  title,
}: {
  children: React.ReactNode;
  title?: string;
}) {
  let { styles, renderMode } = useContext(StylesContext);

  let head = (
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      {title ? <title>{title}</title> : null}
      <Meta />
      <Links />
      {styles}
    </head>
  );

  let body = (
    <body>
      {children}
      <ScrollRestoration />
      <Scripts />
      {process.env.NODE_ENV === "development" && <LiveReload />}
    </body>
  );

  switch (renderMode) {
    case "head":
      return head;
    case "body":
      return body;
    default:
      return (
        <html lang="en">
          {head}
          {body}
        </html>
      );
  }
}
