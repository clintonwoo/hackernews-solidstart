import { A, useLocation } from "@solidjs/router";
import { JSX } from "solid-js";

export interface IItemTitleProps {
  id: number;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  rank?: number;
  title: string;
  url: string | undefined;
  upvoted: boolean;
}

export function ItemTitle(props: IItemTitleProps): JSX.Element {
  const {
    id,
    isRankVisible = true,
    isUpvoteVisible = true,
    rank,
    title,
    upvoted,
    url,
  } = props;

  const loc = useLocation();

  const hostname: string | undefined = url ? new URL(url).hostname : undefined;

  return (
    <tr class="athing">
      <td
        style={{ "text-align": "right", "vertical-align": "top" }}
        class="title"
      >
        <span class="rank">{isRankVisible && `${rank}.`}</span>
      </td>
      <td style={{ "vertical-align": "top" }} class="votelinks">
        <div style={{ "text-align": "center" }}>
          {isUpvoteVisible && (
            <A
              class={upvoted ? "nosee" : " "}
              href={`/vote?id=${id}&how=up&goto=${loc.pathname + loc.search}`}
              style={{ cursor: "pointer" }}
            >
              <div class="votearrow" title="upvote" />
            </A>
          )}
        </div>
      </td>
      <td class="title">
        {url ? (
          <>
            <a class="storylink" href={url}>
              {title}
            </a>
            <span class="sitebit comhead">
              {" "}
              (
              <A href={`/from?site=${hostname}`}>
                <span class="sitestr">{hostname}</span>
              </A>
              )
            </span>
          </>
        ) : (
          <A class="storylink" href={`/item?id=${id}`}>
            {title}
          </A>
        )}
      </td>
    </tr>
  );
}
