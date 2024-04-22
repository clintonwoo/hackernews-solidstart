import { A } from "@solidjs/router";
import { JSX } from "solid-js";

interface IHeaderNavProps {
  userId?: string;
  currentUrl: string;
  isNavVisible: boolean;
  title: string;
}

export function HeaderLinks(props: IHeaderNavProps): JSX.Element {
  const { userId, currentUrl, isNavVisible, title } = props;

  return isNavVisible ? (
    <span class="pagetop">
      <b class="hnname">
        <A href="/">{title}</A>
      </b>
      &nbsp;
      {userId && (
        <>
          <A href="/newswelcome">welcome</A>
          {" | "}
        </>
      )}
      <A class={currentUrl === "/newest" ? "topsel" : ""} href="/newest">
        new
      </A>
      {userId && (
        <>
          {" | "}
          <A
            class={currentUrl === "/threads" ? "topsel" : ""}
            prefetch="intent"
            href={`/threads?id=${userId}`}
          >
            threads
          </A>
        </>
      )}
      {" | "}
      <A
        class={currentUrl === "/newcomments" ? "topsel" : ""}
        prefetch="intent"
        href="/newcomments"
      >
        comments
      </A>
      {" | "}
      <A
        class={currentUrl === "/show" ? "topsel" : ""}
        prefetch="intent"
        href="/show"
      >
        show
      </A>
      {" | "}
      <A
        class={currentUrl === "/ask" ? "topsel" : ""}
        prefetch="intent"
        href="/ask"
      >
        ask
      </A>
      {" | "}
      <A
        class={currentUrl === "/jobs" ? "topsel" : ""}
        prefetch="intent"
        href="/jobs"
      >
        jobs
      </A>
      {" | "}
      <A class={currentUrl === "/submit" ? "topsel" : ""} href="/submit">
        submit
      </A>
      {currentUrl === "/best" && (
        <>
          {" | "}
          <A class="topsel" prefetch="intent" href="/best">
            best
          </A>
        </>
      )}
    </span>
  ) : (
    <span class="pagetop">
      <b>{title}</b>
    </span>
  );
}
