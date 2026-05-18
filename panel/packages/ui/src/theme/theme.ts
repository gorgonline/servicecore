/**
 * @servicecore/ui — AntD ThemeConfig
 *
 * Tüketici `<ConfigProvider theme={servicecoreTheme}>` ile sarar.
 * Bu tüm AntD bileşenlerine (bizim wrap'larımız dahil) ServiceCore dilini giydirir.
 *
 * AntD 5.7 baseline — sonraki sürümlerde eklenen component token'lar burada kullanılmaz.
 * Detaylı bileşen özelleştirmesi Faz 3+ wrap'larda CSS Module ile yapılır.
 *
 * NOT: AntD theme objesi hex/rgb değerleri ister — CSS değişkeni vermek mapToken
 * algoritmasını kırar (palette derivation çalışmaz). O yüzden burada tokens.ts'ten
 * gerçek değerler alıyoruz.
 */

import type { ThemeConfig } from "antd";
import {
  colors,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  radius,
  controlHeight,
  duration,
} from "./tokens";

export const servicecoreTheme: ThemeConfig = {
  token: {
    /* Brand */
    colorPrimary: colors.primary[500],
    colorInfo:    colors.primary[500],
    colorSuccess: "#16A34A",
    colorWarning: "#F59E0B",
    colorError:   "#EF4444",

    /* Surface */
    colorBgBase:          "#FFFFFF",
    colorTextBase:        "#0F172A",
    colorBorder:          "#E5E7EB",
    colorBorderSecondary: "#F1F5F9",

    /* Radius */
    borderRadius:   radius.md,
    borderRadiusSM: radius.sm,
    borderRadiusLG: radius.lg,
    borderRadiusXS: radius.xs,

    /* Typography */
    fontFamily:     fontFamily.sans,
    fontFamilyCode: fontFamily.mono,
    fontSize:       fontSize.md,
    fontSizeSM:     fontSize.sm,
    fontSizeLG:     fontSize.lg,
    fontSizeXL:     fontSize.xl,
    fontSizeHeading1: fontSize["4xl"],
    fontSizeHeading2: fontSize["3xl"],
    fontSizeHeading3: fontSize["2xl"],
    fontSizeHeading4: fontSize.xl,
    fontSizeHeading5: fontSize.lg,

    lineHeight:         lineHeight.normal,
    lineHeightHeading1: lineHeight.tight,
    lineHeightHeading2: lineHeight.tight,
    lineHeightHeading3: lineHeight.snug,
    lineHeightHeading4: lineHeight.snug,
    lineHeightHeading5: lineHeight.snug,

    fontWeightStrong: fontWeight.semibold,

    /* Controls */
    controlHeight:   controlHeight.md,
    controlHeightSM: controlHeight.sm,
    controlHeightLG: controlHeight.lg,

    /* Motion (sade panel — animasyonlar minimum) */
    motionDurationFast: `${duration.fast}ms`,
    motionDurationMid:  `${duration.normal}ms`,
    motionDurationSlow: `${duration.slow}ms`,

    wireframe: false,
  },

  /* Component-level override'lar AntD 5.7'de sınırlı.
   * Detaylı stiller Faz 3+ wrap'larda CSS Module ile uygulanır.
   * Burada sadece 5.7'de garanti çalışan token'ları tutuyoruz. */
  components: {
    Button: {
      borderRadius:  radius.md,
      controlHeight: controlHeight.md,
    },
    Input: {
      borderRadius:  radius.md,
      controlHeight: controlHeight.md,
    },
    Select: {
      borderRadius:  radius.md,
      controlHeight: controlHeight.md,
    },
    Card: {
      borderRadius: radius.lg,
    },
    Modal: {
      borderRadiusLG: radius.lg,
    },
    Tag: {
      borderRadiusSM: radius.sm,
    },
  },
};
