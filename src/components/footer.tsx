import { A } from "@solidjs/router";
import { JSX } from "solid-js";

import sGif from "/static/s.gif";

export function Footer(): JSX.Element {
  return (
    <tr>
      <td style={{ padding: "0px" }}>
        <img alt="" src={sGif} height="10" width="0" />
        <table
          style={{ height: "2px", width: "100%", "border-spacing": "0px" }}
        >
          <tbody>
            <tr>
              <td style={{ "background-color": "#ff6600" }} />
            </tr>
          </tbody>
        </table>
        <br />
        <div style={{ "text-align": "center" }}>
          <span class="yclinks">
            <a href="/newsguidelines">Guidelines</a>
            &nbsp;| <A href="/newsfaq">FAQ</A>
            &nbsp;| <a href="mailto:hn@ycombinator.com">Support</a>
            &nbsp;| <a href="https://github.com/HackerNews/API">API</a>
            &nbsp;| <A href="/security">Security</A>
            &nbsp;| <A href="/lists">Lists</A>
            &nbsp;| <A href="/bookmarklet">Bookmarklet</A>
            &nbsp;| <A href="/dmca">DMCA</A>
            &nbsp;| <a href="http://www.ycombinator.com/apply/">Apply to YC</a>
            &nbsp;| <a href="mailto:hn@ycombinator.com">Contact</a>
          </span>
          <br />
          <br />
          <form
            method="get"
            action="//hn.algolia.com/"
            style={{ "margin-bottom": "1em" }}
          >
            Search:
            <input
              type="text"
              name="q"
              size={17}
              autocorrect="off"
              spellcheck={false}
              autoCapitalize="off"
              autocomplete="false"
            />
          </form>
        </div>
      </td>
    </tr>
  );
}
