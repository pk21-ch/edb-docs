import type { Element, Root, Text } from "hast";
import type { Plugin, Transformer } from "unified";

type HastParent = Root | Element;

type AstroVFile = { data: { astro?: { frontmatter?: Record<string, unknown> } } };

export const rehypeNumberHeadings: Plugin<[], Root> = function (): Transformer<Root> {
  return (tree: Root, file: AstroVFile) => {
    const frontmatter = file.data.astro?.frontmatter;

    if (!frontmatter) return;

    const chapterOrder = (frontmatter.sidebar as { order?: number } | undefined)?.order;
    const numberedHeadings = frontmatter.numberedHeadings === true;

    if (chapterOrder === undefined && !numberedHeadings) return;

    let h2 = 0,
      h3 = 0,
      h4 = 0;

    function walk(node: HastParent): void {
      for (const child of node.children) {
        if (child.type !== "element") continue;
        const el = child as Element;

        if (el.tagName === "h2" || el.tagName === "h3" || el.tagName === "h4") {
          if (el.tagName === "h2") {
            h2++;
            h3 = 0;
            h4 = 0;
          } else if (el.tagName === "h3") {
            h3++;
            h4 = 0;
          } else {
            h4++;
          }

          let prefix: string;
          if (numberedHeadings) {
            if (el.tagName === "h2") prefix = h2 + ".";
            else if (el.tagName === "h3") prefix = h2 + "." + h3 + ".";
            else prefix = h2 + "." + h3 + "." + h4 + ".";
          } else {
            if (el.tagName === "h2") prefix = chapterOrder + "." + h2 + ".";
            else if (el.tagName === "h3") prefix = chapterOrder + "." + h2 + "." + h3 + ".";
            else prefix = chapterOrder + "." + h2 + "." + h3 + "." + h4 + ".";
          }

          const span: Element = {
            type: "element",
            tagName: "span",
            properties: { className: ["heading-number"] },
            children: [{ type: "text", value: prefix + "\u00A0" } satisfies Text],
          };
          el.children.unshift(span);
        } else {
          walk(el);
        }
      }
    }

    walk(tree);
  };
};
