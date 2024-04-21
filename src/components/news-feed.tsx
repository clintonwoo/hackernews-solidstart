import { For, JSX, Match, Switch } from "solid-js";

import type { IStory } from "../server/responses";
import { useCurrentPathname } from "../utils/hooks";
import { ItemDetail } from "./item-detail";
import { ItemTitle } from "./item-title";
import { LoadingSpinner } from "./loading-spinner";

export interface INewsFeedProps {
  error?: any;
  isJobListing?: boolean;
  isLoading?: boolean;
  isPostScrutinyVisible?: boolean;
  isRankVisible?: boolean;
  isUpvoteVisible?: boolean;
  stories: Array<IStory | void> | void;
  notice?: JSX.Element;
  pageNumber: number;
  postsPerPage: number;
}

export function NewsFeed(props: INewsFeedProps): JSX.Element {
  const currentPathname = useCurrentPathname();
  console.log("stories", props.stories);

  return (
    <Switch>
      <Match when={props.error}>
        <tr>
          <td>Error loading news items.</td>
        </tr>
      </Match>
      <Match when={props.isLoading}>
        <LoadingSpinner />
      </Match>
      <Match when={!props.stories?.length}>
        <tr>
          <td>No stories found.</td>
        </tr>
      </Match>
      <Match when={true}>
        <tr>
          <td style={{ padding: "0px" }}>
            <table
              style={{
                border: "0px",
                padding: "0px",
                "border-collapse": "collapse",
                "border-spacing": "0px",
              }}
              class="itemlist"
            >
              <tbody>
                {props.notice}
                <For
                  each={props.stories.filter(
                    (newsItem): newsItem is IStory =>
                      !!newsItem && !newsItem.hidden
                  )}
                >
                  {(newsItem, index) => (
                    <>
                      <ItemTitle
                        key={`${newsItem.id}title`}
                        id={newsItem.id}
                        isRankVisible={props.isRankVisible}
                        isUpvoteVisible={props.isUpvoteVisible}
                        rank={
                          props.postsPerPage * (props.pageNumber - 1) +
                          index() +
                          1
                        }
                        title={newsItem.title}
                        upvoted={newsItem.didUserUpvote}
                        url={newsItem.url}
                      />
                      <ItemDetail
                        key={`${newsItem.id}detail`}
                        commentCount={newsItem.commentCount}
                        creationTime={newsItem.creationTime}
                        hidden={newsItem.hidden}
                        id={newsItem.id}
                        isFavoriteVisible={false}
                        isJobListing={props.isJobListing}
                        isPostScrutinyVisible={props.isPostScrutinyVisible}
                        submitterId={newsItem.submitterId}
                        upvoteCount={newsItem.upvoteCount}
                      />
                      <tr class="spacer" style={{ height: "5px" }} />
                    </>
                  )}
                </For>
                <tr class="morespace" style={{ height: "10px" }} />
                <tr>
                  <td colSpan={2} />
                  <td class="title">
                    <a
                      href={`${currentPathname}?p=${props.pageNumber + 1}`}
                      class="morelink"
                      rel="nofollow"
                    >
                      More
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </Match>
    </Switch>
  );
}
