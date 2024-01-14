import { useCallback } from "react";
import { useMedia } from "react-use";

import { isMobile } from "react-device-detect";

const SCREEN_SIZE = ["xl", "lg", "md", "sm", "xs"] as const;
type ScreenSize = (typeof SCREEN_SIZE)[number];

export default function useScreen(): (size: ScreenSize) => boolean {
    const xl = useMedia("(min-width: 1280px)", false);
    const lg = useMedia("(min-width: 1024px)", !isMobile);
    const md = useMedia("(min-width: 768px)", !isMobile);
    const sm = useMedia("(min-width: 640px)", !isMobile);
    const xs = useMedia("(min-width: 100px)", true);

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
