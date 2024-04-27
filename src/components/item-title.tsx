import { A, useLocation } from "@solidjs/router";
import { JSX, mergeProps, Show } from "solid-js";

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
  const defaultProps = mergeProps(
    {
      isRankVisible: true,
      isUpvoteVisible: true,
    },
    props
  );

  const loc = useLocation();

  const hostname = (): string | undefined =>
    props.url ? new URL(props.url).hostname : undefined;

  return (
    <tr class="athing">
      <td
        style={{ "text-align": "right", "vertical-align": "top" }}
        class="title"
      >
        <span class="rank">
          {defaultProps.isRankVisible && `${props.rank}.`}
        </span>
      </td>
      <td style={{ "vertical-align": "top" }} class="votelinks">
        <div style={{ "text-align": "center" }}>
          {defaultProps.isUpvoteVisible && (
            <A
              classList={{ nosee: props.upvoted }}
              href={`/vote?id=${props.id}&how=up&goto=${loc.pathname + loc.search}`}
              style={{ cursor: "pointer" }}
            >
              <div class="votearrow" title="upvote" />
            </A>
          )}
        </div>
      </td>
      <td class="title">
        <Show
          when={props.url}
          fallback={
            <A class="storylink" href={`/item?id=${props.id}`}>
              {props.title}
            </A>
          }
        >
          <>
            <a class="storylink" href={props.url}>
              {props.title}
            </a>
            <span class="sitebit comhead">
              {" "}
              (
              <A href={`/from?site=${hostname()}`}>
                <span class="sitestr">{hostname()}</span>
              </A>
              )
            </span>
          </>
        </Show>
      </td>
    </tr>
  );
}
