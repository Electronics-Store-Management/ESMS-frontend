import { useCallback } from "react";
import { useMedia } from "react-use";

const SCREEN_SIZE = ["xl", "lg", "md", "sm", "xs"] as const;
type ScreenSize = (typeof SCREEN_SIZE)[number];

export default function useScreen(): (size: ScreenSize) => boolean {
    const xl = useMedia("(min-width: 1280px)");
    const lg = useMedia("(min-width: 1024px)");
    const md = useMedia("(min-width: 768px)");
    const sm = useMedia("(min-width: 640px)");
    const xs = useMedia("(min-width: 100px)");

    const checkSize = useCallback(
        (size: ScreenSize): boolean => {
            const requestIndex = SCREEN_SIZE.indexOf(size);
            const computedIndex = [xl, lg, md, sm, xs].indexOf(true);
            if (computedIndex < 0) return false;
            return computedIndex <= requestIndex;
        },
        [xl, lg, md, sm, xs],
    );

    return checkSize;
}
