// import { useLoaderData, LoaderFunction, MetaFunction } from "remix";
import { Meta } from "@solidjs/meta";
import {
  RouteDefinition,
  RouteLoadFunc,
  RouteSectionProps,
} from "@solidjs/router";
import { JSX } from "solid-js";

import { NewsFeed } from "../components/news-feed";
import { POSTS_PER_PAGE } from "../config";
import { getSession, SessionCookieProperties } from "../cookies";
import { MainLayout } from "../layouts/main-layout";
import { feedService } from "../server/bootstrap.server";
import { FeedType } from "../server/models";
import type { IStory } from "../server/responses";
import { usePageNumber } from "../utils/hooks";
import { getSearchParamsFromRequest } from "../utils/http-handlers";
import { getPageNumberFromSearchParams } from "../utils/news-page-number";

export interface IIndexPageLoader {
  stories: IStory[];
}
const getNewsStories: RouteLoadFunc<Promise<IIndexPageLoader>> = async (
  request
): Promise<IIndexPageLoader> => {
  "use server";
  console.log(request.location.search);
  // const session = await getSession(request.headers.get("Cookie"));
  const session = await getSession(request);
  console.log(session);
  const userId = session.data[SessionCookieProperties.USER_ID];

  const searchParams = getSearchParamsFromRequest(request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * (pageNumber - 1);

  const stories = await feedService.getForType(
    FeedType.TOP,
    first,
    skip,
    userId
  );

  return { stories };
};

export const route = {
  load: getNewsStories,
} satisfies RouteDefinition;

export default function IndexPage(
  props: RouteSectionProps<IIndexPageLoader>
): JSX.Element {
  // const stories = createAsync(() => getNewsStories());
  const pageNumber: number = usePageNumber();
  console.log("props", props);
  console.log();
  // console.log("gg", stories.data);
  return (
    <MainLayout>
      <Meta
        name="description"
        content="The top stories from technology and startup business hackers around the world."
      />
      <NewsFeed
        stories={props.data}
        pageNumber={pageNumber}
        postsPerPage={POSTS_PER_PAGE}
      />
    </MainLayout>
  );
}
