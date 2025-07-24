import { container } from "@mdit/plugin-container";
import { type MarkdownEnv } from "vitepress";
import { load } from "js-yaml";
import { type Options, type PluginSimple } from "markdown-it";
import type Token from "markdown-it/lib/token.mjs";

import {
    entries,
    fromEntries,
    isPlainObject,
    isString,
    stringifyProp,
} from "../untils/utils.js";

export interface CardOptions {
    title: string;
    desc?: string;
    logo?: string;
    link?: string;
    color?: string;
    theme?: "normal" | "medium";
    hoverShadow?: boolean;
    shadow?: boolean;
}

const CARD_PROPS = [
    "title",
    "desc",
    "logo",
    "link",
    "color",
    "hoverShadow",
    "shadow",
    "theme",
];

const checkCardProps = (config: unknown): CardOptions | null => {
    if (isPlainObject(config) && isString(config["title"]))
        return fromEntries(
            entries(config).filter(
                (item): item is [string, string] =>
                    CARD_PROPS.includes(item[0]) && isString(item[1]),
            ),
        ) as unknown as CardOptions;

    return null;
};

const cardRender = (
    tokens: Token[],
    index: number,
    _options: Options,
    { relativePath }: MarkdownEnv,
): string => {
    const token = tokens[index];
    const { content, info } = token;

    const language = info.trim().split(":", 2)[1] || "yml";
    let config: unknown = null;

    if (language === "yaml" || language === "yml")
        try {
            config = load(content);
        } catch (err) {
            console.error(`Parsing card YAML config failed:`, err);
        }
    else if (language === "json")
        try {
            config = <unknown>JSON.parse(content);
        } catch (err) {
            // do nothing
            console.error(`Parsing card JSON config failed:`, err);
        }
    else
        console.error(
            `Can not parse card config ${language}${
                relativePath ? `, found in ${relativePath}` : ""
            }.`,
        );

    const cardData = checkCardProps(config);

    if (cardData) return `<VPCard v-bind='${stringifyProp(cardData)}' />`;

    console.error(
        `Invalid card config${relativePath ? ` found in ${relativePath}` : ""}:
${content}
`,
    );

    return "";
};

export const cardPlugin: PluginSimple = (md) => {
    // add card container
    md.use(container, {
        name: "card",
        openRender: () =>
            `\
<div class="vp-card-container">
`,
    });

    // Handle ```card  blocks
    const fence = md.renderer.rules.fence;

    md.renderer.rules.fence = (...args): string => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [tokens, index, options, env] = args;
        const { info } = tokens[index];
        const realInfo = info.split(":", 2)[0];

        if (realInfo === "card")
            return cardRender(tokens, index, options, <MarkdownEnv>env);

        return fence!(...args);
    };

    md.renderer.rules["card"] = cardRender;
};
