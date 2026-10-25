import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from "react";

type ScrollTextProps = HTMLAttributes<HTMLElement> & {
  as?: "h1" | "h2" | "h3" | "p";
};

function splitWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      return String(child).split(/(\s+)/).map((word, index) =>
        /\S/.test(word) ? <span data-scroll-word="" key={index}>{word}</span> : word,
      );
    }
    if (isValidElement<{ children?: ReactNode }>(child) && child.props.children) {
      return cloneElement(child as ReactElement<{ children?: ReactNode }>, {
        children: splitWords(child.props.children),
      });
    }
    return child;
  });
}

/** Server-rendered words remain readable without JavaScript or motion support. */
export function ScrollText({ as: Tag = "p", children, ...props }: ScrollTextProps) {
  return <Tag {...props} data-scroll-text="">{splitWords(children)}</Tag>;
}
