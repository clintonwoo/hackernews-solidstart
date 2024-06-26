import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";

import { getSession, SessionCookieProperties } from "../../cookies";
import { commentService } from "../../server/bootstrap.server";
import type { IComment } from "../../server/responses";
import {
  checkBadRequest,
  getSearchParamsFromRequest,
  URLSearchParamFields,
} from "../../utils/http-handlers";
import { MainLayout } from "../../layouts/main-layout";

export interface IReplyPageLoader {
  comment: IComment;
}
export const loader: LoaderFunction = async ({ request }) => {
  const searchParams = getSearchParamsFromRequest(request);
  const commentId = +searchParams.get(URLSearchParamFields.ID)!;
  checkBadRequest(commentId, '"id" is required.');

  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get(SessionCookieProperties.USER_ID);

  const comment = await commentService.getComment(commentId, userId);

  return { comment };
};

export const meta: MetaFunction = () => {
  return { title: "Add Comment | Hacker News Clone" };
};

function ReplyPage(): JSX.Element {
  const { comment } = useLoaderData<IReplyPageLoader>();

  return (
    <MainLayout title="Add Comment" isNavVisible={false}>
      <tr>
        <td>
          <table class="fatitem" style={{ border: "0" }}>
            <tbody>
              <tr class="athing" id={comment.id.toString()}>
                <td class="ind" />
                <td style={{ verticalAlign: "top" }} class="votelinks">
                  <div style={{ textAlign: "center" }}>
                    <a
                      id={`up_${comment.id}`}
                      href={`vote?id=${comment.id}&how=up&goto=reply?goto=item?id=${comment.parent}#${comment.id}&id=${comment.id}#${comment.id}`}
                    >
                      <div class="votearrow" title="upvote" />
                    </a>
                  </div>
                </td>
                <td class="default">
                  <div style={{ marginTop: "2px", marginBottom: "-10px" }}>
                    <span class="comhead">
                      <Link
                        to={`user?id=${comment.submitterId}`}
                        class="hnuser"
                      >
                        {comment.submitterId}
                      </Link>
                      <span class="age">
                        <Link to={`item?id=${comment.id}`}>2 hours ago</Link>
                      </span>
                      <span id={`unv_${comment.id}`} />
                      <span class="par">
                        {" "}
                        | <a href={`item?id=${comment.parent}`}>parent</a>
                      </span>
                      <span class="storyon">
                        {" "}
                        | on:{" "}
                        <a href={`item?id=${comment.parent}`}>
                          Electric dump truck stores as much energy as 8 Mod...
                        </a>
                      </span>
                    </span>
                  </div>
                  <br />
                  <div class="comment">
                    <span
                      class="c00"
                      dangerouslySetInnerHTML={{ __html: comment.text }}
                    />
                    <div class="reply" />
                  </div>
                </td>
              </tr>
              <tr style={{ height: "10px" }} />
              <tr>
                <td colSpan={2} />
                <td>
                  <form method="post" action="comment">
                    <input
                      type="hidden"
                      name="parent"
                      value={`${comment.id}`}
                    />
                    <input
                      type="hidden"
                      name="goto"
                      value={`item?id=${comment.parent}#${comment.id}`}
                    />
                    <input
                      type="hidden"
                      name="hmac"
                      value="d4cda96b7000a0e0cd578dde21feb6c9070cda8a"
                    />
                    <textarea name="text" rows={6} cols={60} />
                    <br />
                    <br />
                    <input type="submit" value="reply" />
                  </form>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </MainLayout>
  );
}

export default ReplyPage;
