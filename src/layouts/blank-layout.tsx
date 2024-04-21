import { JSX } from "solid-js";

export interface IBlankLayoutProps {
  children: JSX.Element;
}

export function BlankLayout(props: IBlankLayoutProps): JSX.Element {
  const { children } = props;

  return <div class="WordSection1">{children}</div>;
}
