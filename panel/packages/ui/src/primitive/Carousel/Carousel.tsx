import { Carousel as AntCarousel } from "antd";
import clsx from "clsx";
import styles from "./Carousel.module.css";
import type { CarouselProps } from "./Carousel.types";

/** ServiceCore Carousel — AntD Carousel wrap.
 *
 * Slide rotasyonu — login splash, onboarding tour, dashboard widget
 * rotation, feature highlight banner, feature tour. Üretimde sınırlı
 * kullan: kullanıcı genelde otomatik rotasyonu sevmez, manuel kontrolde
 * dots/arrow yeterli.
 *
 * AntD API'sini 1:1 korur. Imperative methods (goTo/next/prev) ref ile.
 *
 * @example Temel
 * ```tsx
 * <Carousel autoplay>
 *   <div><img src="slide1.png" /></div>
 *   <div><img src="slide2.png" /></div>
 * </Carousel>
 * ```
 *
 * @example Imperative
 * ```tsx
 * const ref = useRef<CarouselRef>(null);
 * <Carousel ref={ref} effect="fade">...</Carousel>
 * <Button onClick={() => ref.current?.next()}>İleri</Button>
 * ```
 */
export function Carousel({ className, ...rest }: CarouselProps) {
  return (
    <AntCarousel {...rest} className={clsx(styles.carousel, className)} />
  );
}
