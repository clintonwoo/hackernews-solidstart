import { children, JSX } from "solid-js";

export interface IBlankLayoutProps {
  children: JSX.Element;
}

export function BlankLayout(props: IBlankLayoutProps): JSX.Element {
  const getChildren = children(() => props.children);
  return <div class="WordSection1">{getChildren()}</div>;
}
