import type { ComponentProps } from "react";
import type { Carousel as AntCarousel } from "antd";
import type { CarouselRef as AntCarouselRef } from "antd/es/carousel";

/** Carousel imperative methods (ref ile) — goTo/next/prev.
 *  AntD'nin internal tipinden re-export. */
export type CarouselRef = AntCarouselRef;

/** Effect — slide geçiş animasyonu. */
export type CarouselEffect = "scrollx" | "fade";

/** Dot konumu. */
export type CarouselDotPosition = "top" | "bottom" | "left" | "right";

/** ServiceCore Carousel — AntD Carousel 1:1 props.
 *
 * NOT — AntD 5.7 baseline'da olanlar:
 *   autoplay (boolean), autoplaySpeed, adaptiveHeight,
 *   dotPosition / dotPlacement, dots (boolean | object),
 *   draggable, effect (scrollx/fade), easing, infinite, speed,
 *   beforeChange, afterChange, waitForAnimate,
 *   methods (goTo, next, prev)
 *
 * 5.7'de YOK:
 *   arrows (5.17+) — prev/next button'ları manuel ref ile yap,
 *   autoplay.dotDuration object form (5.24+),
 *   classNames/styles semantic DOM (6.0+).
 */
export type CarouselProps = ComponentProps<typeof AntCarousel>;
