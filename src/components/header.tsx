import { A } from "@solidjs/router";
import { JSX, useContext } from "solid-js";

import { ICurrentLoggedInUser, MeContext } from "../utils/context";
import { useCurrentPathname } from "../utils/hooks";
import { HeaderLinks } from "./header-links";

import y18Gif from "/static/y18.gif";

export interface IHeaderProps {
  isNavVisible: boolean;
  title: string;
}

export function Header(props: IHeaderProps): JSX.Element {
  const { isNavVisible, title } = props;

  const currentUrl = useCurrentPathname();
  const me = useContext<ICurrentLoggedInUser | undefined>(MeContext);

  return (
    <tr>
      <td style={{ "background-color": "#ff6600", padding: "0px" }}>
        <table
          style={{
            border: "0px",
            padding: "2px",
            "border-spacing": "0px",
            width: "100%",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "18px",
                  padding: "0px",
                  "padding-right": "4px",
                }}
              >
                <A href="/">
                  <img
                    src={y18Gif}
                    style={{
                      border: "1px",
                      "border-color": "white",
                      "border-style": "solid",
                      height: "18px",
                      width: "18px",
                    }}
                  />
                </A>
              </td>
              <td
                style={{
                  "line-height": "12px",
                  height: "10px",
                  padding: "0px",
                }}
              >
                <HeaderLinks
                  currentUrl={currentUrl}
                  isNavVisible={isNavVisible}
                  title={title}
                />
              </td>
              <td
                style={{
                  "text-align": "right",
                  padding: "0px",
                  "padding-right": "4px",
                }}
              >
                {me ? (
                  <span class="pagetop">
                    <A href={`/user?id=${me.id}`}>{me.id}</A>
                    {` (${me.karma}) | `}
                    <a
                      href={`/logout?auth=d78ccc2c6120ffe08f32451519c2ff46d34c51ab&amp;goto=${currentUrl}`}
                    >
                      logout
                    </a>
                  </span>
                ) : (
                  <span class="pagetop">
                    <A href={`/login?goto=${currentUrl}`}>login</A>
                  </span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
