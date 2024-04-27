import { children, JSX, mergeProps } from "solid-js";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

import "../assets/news.css";

interface IMainLayoutProps {
  children: JSX.Element;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function MainLayout(props: IMainLayoutProps): JSX.Element {
  const defaultProps = mergeProps(
    {
      isNavVisible: true,
      isFooterVisible: true,
      title: "Hacker News",
    },
    props
  );
  const getChildren = children(() => props.children);

  return (
    <div>
      <table
        id="hnmain"
        style={{
          "background-color": "#f6f6ef",
          border: "0px",
          "border-collapse": "collapse",
          "border-spacing": "0px",
          "margin-left": "auto",
          "margin-right": "auto",
          padding: "0px",
          width: "85%",
        }}
      >
        <tbody>
          <Header
            isNavVisible={!!defaultProps.isNavVisible}
            title={defaultProps.title!}
          />
          <tr style={{ height: "10px" }} />
          {getChildren()}
          {defaultProps.isFooterVisible && <Footer />}
        </tbody>
      </table>
    </div>
  );
}
