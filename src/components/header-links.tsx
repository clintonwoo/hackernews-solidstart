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
      <A classList={{ topsel: currentUrl === "/newest" }} href="/newest">
        new
      </A>
      {userId && (
        <>
          {" | "}
          <A
            classList={{ topsel: currentUrl === "/threads" }}
            prefetch="intent"
            href={`/threads?id=${userId}`}
          >
            threads
          </A>
        </>
      )}
      {" | "}
      <A
        classList={{ topsel: currentUrl === "/newcomments" }}
        prefetch="intent"
        href="/newcomments"
      >
        comments
      </A>
      {" | "}
      <A
        classList={{ topsel: currentUrl === "/show" }}
        prefetch="intent"
        href="/show"
      >
        show
      </A>
      {" | "}
      <A
        classList={{ topsel: currentUrl === "/ask" }}
        prefetch="intent"
        href="/ask"
      >
        ask
      </A>
      {" | "}
      <A
        classList={{ topsel: currentUrl === "/jobs" }}
        prefetch="intent"
        href="/jobs"
      >
        jobs
      </A>
      {" | "}
      <A classList={{ topsel: currentUrl === "/submit" }} href="/submit">
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
