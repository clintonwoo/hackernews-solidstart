import { JSX } from "solid-js";

import yc500Gif from "/static/yc500.gif";

export interface INoticeLayoutProps {
  children: JSX.Element;
}

export function NoticeLayout(props: INoticeLayoutProps): JSX.Element {
  const { children } = props;

  return (
    <div>
      <br />
      <br />
      <table
        style={{
          "margin-left": "auto",
          "margin-right": "auto",
          padding: "0px",
          width: "500px",
        }}
      >
        <tbody>
          <tr>
            <td style={{ "border-color": "#fafaf0" }}>
              <a href="http://www.ycombinator.com">
                <img
                  alt=""
                  src={yc500Gif}
                  style={{ border: "0px" }}
                  width="500"
                />
              </a>
              <br />
              <br />
              {children}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
