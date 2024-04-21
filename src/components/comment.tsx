import { A } from "@solidjs/router";
import { JSX } from "solid-js";

import { convertNumberToTimeAgo } from "../utils/convert-number-to-time-ago";

import sGif from "/static/s.gif";

export interface ICommentProps {
  collapsedChildrenCommentsCount: number | undefined;
  creationTime: number;
  id: number;
  indentationLevel: number;
  isCollapsed: boolean;
  submitterId: string;
  text: string;
  toggleCollapseComment: (id: number) => void;
}

export function Comment(props: ICommentProps): JSX.Element {
  const {
    creationTime,
    collapsedChildrenCommentsCount,
    id,
    indentationLevel,
    isCollapsed,
    submitterId,
    text,
    toggleCollapseComment,
  } = props;

  const collapseComment = () => {
    toggleCollapseComment(id);
  };

  return (
    <tr class="athing comtr " id={id.toString()}>
      <td>
        <table style={{ border: "0" }}>
          <tbody>
            <tr>
              <td class="ind">
                <img
                  alt=""
                  src={sGif}
                  height="1"
                  width={
                    indentationLevel * 40
                  } /* Width varies depending on comment level */
                />
              </td>
              <td style={{ "vertical-align": "top" }} class="votelinks">
                <div style={{ "text-align": "center" }}>
                  <a
                    id={`up_${id}`}
                    href={`vote?id=${id}&how=up&auth=4eb97bf0d2568aa743691210b904f0c5182bb0fc&goto=item?id=${id}`}
                  >
                    <div class="votearrow" title="upvote" />
                  </a>
                </div>
              </td>
              <td class="default">
                <div style={{ "margin-top": "2px", "margin-bottom": "-10px" }}>
                  <span class="comhead">
                    <A class="hnuser" href={`/user?id=${submitterId}`}>
                      {submitterId}
                    </A>
                    <span class="age">
                      {" "}
                      <A href={`/item?id=${id}`}>
                        {convertNumberToTimeAgo(creationTime)}
                      </A>
                    </span>{" "}
                    <span id="unv_15238246" />
                    <span class="par" />{" "}
                    <span class="togg" id="24" onClick={collapseComment}>
                      {isCollapsed
                        ? `[${
                            collapsedChildrenCommentsCount
                              ? `${collapsedChildrenCommentsCount + 1} more`
                              : "+"
                          }] `
                        : "[-]"}
                    </span>
                    <span class="storyon" />
                  </span>
                </div>
                <br />
                <div //id="help"
                  class="comment"
                >
                  <span class="c00">
                    {!isCollapsed && (
                      <>
                        <div innerHTML={text} />
                        <div class="reply">
                          <p style={{ "font-size": "1" }}>
                            <A href={`/reply?id=${id}&goto=item?id=${id}`}>
                              reply
                            </A>
                          </p>
                        </div>
                      </>
                    )}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );
}
