import { JSX } from "solid-js";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

interface IMainLayoutProps {
  children: JSX.Element;
  isNavVisible?: boolean;
  isUserVisible?: boolean;
  isFooterVisible?: boolean;
  title?: string;
}

export function MainLayout(props: IMainLayoutProps): JSX.Element {
  const {
    children,
    isNavVisible = true,
    isFooterVisible = true,
    title = "Hacker News",
  } = props;

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
          <Header isNavVisible={!!isNavVisible} title={title!} />
          <tr style={{ height: "10px" }} />
          {children}
          {isFooterVisible && <Footer />}
        </tbody>
      </table>
    </div>
  );
}
