import { Title } from "@solidjs/meta";
import { createAsync } from "@solidjs/router";
import { GET } from "@solidjs/start";
import { APIEvent } from "@solidjs/start/server";
import { JSX } from "solid-js";

import { NewsFeed } from "~/components/news-feed";
import { MainLayout } from "~/layouts/main-layout";
import { usePageNumber } from "~/utils/hooks";
import { getSearchParamsFromRequest } from "~/utils/http-handlers";
import { getPageNumberFromSearchParams } from "~/utils/news-page-number";
import { POSTS_PER_PAGE } from "../config";
import { getSession, SessionCookieProperties } from "../cookies";
import { feedService } from "../server/bootstrap.server";
import { FeedType } from "../server/models";
import type { IStory } from "../server/responses";

export interface INewestPageLoader {
  stories: (void | IStory)[];
}
const getNewStories = GET(async (e: APIEvent): Promise<INewestPageLoader> => {
  // const session = await getSession(request.headers.get("Cookie"));
  // const userId = session.get(SessionCookieProperties.USER_ID);
  "use server";
  e.request.url;
  const session = await getSession();
  console.log("get new stories session", session);

  const userId = session.data[SessionCookieProperties.USER_ID];

  const searchParams = getSearchParamsFromRequest(e.request);
  const pageNumber: number = getPageNumberFromSearchParams(searchParams);
  console.log("get new stories", pageNumber);

  const first = POSTS_PER_PAGE;
  const skip = POSTS_PER_PAGE * ((pageNumber ?? 1) - 1);

  return {
    stories: await feedService.getForType(FeedType.NEW, first, skip, userId),
  };
});

// export const route = {
//   load: getNewStories,
// } satisfies RouteDefinition;

export default function NewestPage(): JSX.Element {
  const pageNumber: number = usePageNumber();
  const stories = createAsync<INewestPageLoader>(() =>
    getNewStories(pageNumber)
  );

  // return <div>50</div>;
  return (
    <MainLayout>
      <Title>New Links | Hacker News Clone</Title>
      <NewsFeed
        stories={stories()}
        pageNumber={pageNumber}
        postsPerPage={POSTS_PER_PAGE}
      />
    </MainLayout>
  );
}
