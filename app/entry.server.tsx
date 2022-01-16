import { renderToString } from "react-dom/server";
import { RemixServer } from "remix";
import type { EntryContext } from "remix";
import { ServerStyleSheet } from "styled-components";
import StylesContext from "~/context/styles-context";

export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  remixContext: EntryContext
) {
  const sheet = new ServerStyleSheet();

  // Render <body> and extract styles
  let body = renderToString(
    sheet.collectStyles(
      <StylesContext.Provider value={{ styles: [], renderMode: "body" }}>
        <RemixServer context={remixContext} url={request.url} />
      </StylesContext.Provider>
    )
  );

  // Note: getStyleTags is not really suitable here, using getStyleElement instead
  let styles = sheet.getStyleElement();
  sheet.seal();

  // Render <head> with styles extracted from body
  let head = renderToString(
    <StylesContext.Provider value={{ styles, renderMode: "head" }}>
      <RemixServer context={remixContext} url={request.url} />
    </StylesContext.Provider>
  );

  let markup = `<!DOCTYPE html><html lang="en">${head}${body}</html>`;

  responseHeaders.set("Content-Type", "text/html");

  return new Response(markup, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
