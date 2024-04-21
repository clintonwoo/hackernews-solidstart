import { A } from "@solidjs/router";

import { convertNumberToTimeAgo } from "../utils/convert-number-to-time-ago";

export interface IItemDetailProps {
  commentCount: number;
  creationTime: number;
  hidden?: boolean;
  id: number;
  isFavoriteVisible?: boolean;
  isJobListing?: boolean;
  isPostScrutinyVisible?: boolean;
  submitterId: string;
  upvoteCount: number;
}

const HIDE_BUTTON_STYLE = { cursor: "pointer" };

export function ItemDetail(props: IItemDetailProps): JSX.Element {
  const {
    commentCount,
    creationTime,
    hidden,
    id,
    isFavoriteVisible = true,
    isJobListing = false,
    isPostScrutinyVisible = false,
    submitterId,
    upvoteCount,
  } = props;

  return isJobListing ? (
    <tr>
      <td colSpan={2} />
      <td class="subtext">
        <span class="age">
          <A href={`/item?id=${id}`}>{convertNumberToTimeAgo(creationTime)}</A>
        </span>
      </td>
    </tr>
  ) : (
    <tr>
      <td colSpan={2} />
      <td class="subtext">
        <span class="score">{upvoteCount} points</span>
        {" by "}
        <A class="hnuser" href={`/user?id=${submitterId}`}>
          {submitterId}
        </A>{" "}
        <span class="age">
          <A href={`/item?id=${id}`}>{convertNumberToTimeAgo(creationTime)}</A>
        </span>
        {" | "}
        {hidden ? (
          <A href={`/hide?id=${id}&how=un&goto=news`} style={HIDE_BUTTON_STYLE}>
            unhide
          </A>
        ) : (
          <A href={`/hide?id=${id}&how=up&goto=news`} style={HIDE_BUTTON_STYLE}>
            hide
          </A>
        )}
        {isPostScrutinyVisible && (
          <span>
            {" | "}
            <a href="https://hn.algolia.com/?query=Sublime%20Text%203.0&sort=byDate&dateRange=all&type=story&storyText=false&prefix&page=0">
              past
            </a>
            {" | "}
            <a href="https://www.google.com/search?q=Sublime%20Text%203.0">
              web
            </a>
          </span>
        )}
        {" | "}
        <A href={`/item?id=${id}`}>
          {commentCount === 0
            ? "discuss"
            : commentCount === 1
              ? "1 comment"
              : `${commentCount} comments`}
        </A>
        {isFavoriteVisible && " | favorite"}
      </td>
    </tr>
  );
}
