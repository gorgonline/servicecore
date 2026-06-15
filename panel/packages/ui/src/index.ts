/**
 * @servicecoreui/ui — public API (tek barrel)
 *
 * Tüm bileşenler, tema, token'lar ve ikonlar bu entry point'ten gelir.
 * Sub-path export'lar (wraps/custom/charts/icons/theme) kaldırıldı.
 *
 * "use client" — AntD runtime'da createContext kullanır; bundle client-only.
 */
"use client";

export const VERSION = "0.7.0";

// ── İkonlar (@carbon/icons-react) — önce gelir, çakışanlar aşağıda override edilir ──
export * from "@carbon/icons-react";

// ── Typography (server-safe, no AntD dep) ───────────────────
// Carbon'da Heading ve Code çakışıyor — explicit override
export { Heading } from "./components/Heading";
export type { HeadingProps, HeadingLevel } from "./components/Heading";
export { Display } from "./components/Display";
export type { DisplayProps, DisplaySize } from "./components/Display";
// Text'teki TextColor Carbon ile çakışıyor — explicit override
export { Text } from "./components/Text";
export type { TextProps, TextSize, TextWeight, TextColor, TextAlign } from "./components/Text";
export * from "./components/Eyebrow";
export { Code } from "./components/Code";
export type { CodeProps } from "./components/Code";

// ── Theme & Tokens ──────────────────────────────────────────
export {
  servicecoreTheme,
  colors,
  radius,
  spacing,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  letterSpacing,
  duration,
  easing,
  zIndex,
  controlHeight,
  cssVar,
} from "./theme";

export type {
  ColorScale,
  NeutralStep,
  PrimaryStep,
  Radius,
  Spacing,
  FontSize,
  FontWeight,
} from "./theme";

// ── AntD Wraps — çakışan isimler explicit olarak override edildi ─────────────────
export * from "./components/Button";
export * from "./components/Card";
// Tag çakışıyor — explicit
export { Tag } from "./components/Tag";
export type { TagProps, TagTone, TagSize } from "./components/Tag";
export * from "./components/Input";
export * from "./components/Avatar";
export * from "./components/Divider";
export * from "./components/Flex";
// Badge çakışıyor — explicit
export { Badge } from "./components/Badge";
export type { BadgeProps, BadgeStatus, BadgeRibbonProps } from "./components/Badge";
export * from "./components/Alert";
export * from "./components/Select";
export * from "./components/FloatButton";
// Anchor çakışıyor — explicit
export { Anchor } from "./components/Anchor";
export type { AnchorProps, AnchorDirection, AnchorItem, AnchorContainer, AnchorClickLink } from "./components/Anchor";
export * from "./components/Breadcrumb";
export * from "./components/Dropdown";
// Menu çakışıyor — explicit
export { Menu } from "./components/Menu";
export type { MenuProps, MenuRef } from "./components/Menu";
export * from "./components/Steps";
export * from "./components/Tabs";
// Checkbox çakışıyor — explicit
export { Checkbox } from "./components/Checkbox";
export type { CheckboxProps, CheckboxGroupProps, CheckboxOption, CheckboxValueType } from "./components/Checkbox";
// ColorPicker çakışıyor — explicit
export { ColorPicker } from "./components/ColorPicker";
export type { ColorPickerProps, ColorFormat, ColorPickerSize, ColorPickerTrigger, ColorPickerPreset } from "./components/ColorPicker";
export * from "./components/DatePicker";
export * from "./components/Form";
export * from "./components/InputNumber";
export * from "./components/Mentions";
// Radio çakışıyor — explicit
export { Radio } from "./components/Radio";
export type { RadioProps, RadioGroupProps, RadioButtonProps, RadioOption, RadioSize, RadioOptionType, RadioButtonStyle } from "./components/Radio";
export * from "./components/Rate";
export * from "./components/Slider";
// Switch çakışıyor — explicit
export { Switch } from "./components/Switch";
export type { SwitchProps, SwitchSize } from "./components/Switch";
export * from "./components/TimePicker";
export * from "./components/Transfer";
export * from "./components/TreeSelect";
// Upload çakışıyor — explicit
export { Upload } from "./components/Upload";
export type { UploadProps, UploadDraggerProps, UploadListType, UploadStatus } from "./components/Upload";
// Calendar çakışıyor — explicit
export { Calendar } from "./components/Calendar";
export type { CalendarProps, CalendarMode } from "./components/Calendar";
export * from "./components/Carousel";
export * from "./components/Collapse";
export * from "./components/Descriptions";
export * from "./components/Empty";
// Image çakışıyor — explicit
export { Image } from "./components/Image";
export type { ImageProps, ImagePreviewGroupProps } from "./components/Image";
export * from "./components/Popover";
export * from "./components/QRCode";
export * from "./components/Segmented";
export * from "./components/Statistic";
// Table çakışıyor — explicit
export { Table } from "./components/Table";
export type { TableProps, TableColumnProps, TableColumnGroupProps, TableSize, TableAlign, TableSortOrder, TableFixed } from "./components/Table";
export * from "./components/Timeline";
export * from "./components/Tooltip";
// Tree çakışıyor — explicit
export { Tree } from "./components/Tree";
export type { TreeProps, DirectoryTreeProps, TreeDataNode, TreeDropInfo } from "./components/Tree";
export * from "./components/Drawer";
export * from "./components/Message";
export * from "./components/Modal";
// Notification çakışıyor — explicit
export { notification } from "./components/Notification";
export type { NotificationConfig, NotificationType, NotificationPlacement, NotificationInstance } from "./components/Notification";
export * from "./components/Popconfirm";
export * from "./components/Progress";
// Result çakışıyor — explicit
export { Result } from "./components/Result";
export type { ResultProps, ResultStatus } from "./components/Result";
export * from "./components/Skeleton";
export * from "./components/Spin";

// ── ServiceCore Custom Bileşenler ─────────────────────────────
export * from "./components/Brand";
export * from "./components/Kbd";
export * from "./components/ListItem";
export * from "./components/NavCard";
export * from "./components/PageHeader";
export * from "./components/RecentPanels";
export * from "./components/SearchableMenu";
// DataTable çakışıyor (Carbon'da DataTable var) — explicit
export { DataTable } from "./components/DataTable";
export type { DataTableProps, DataTableColumn, DataTableFilter } from "./components/DataTable";
export * from "./components/CommandPalette";
export * from "./components/TimeTracker";
export * from "./components/NotificationCenter";
export * from "./components/UserMenu";
export * from "./components/PasswordChecklist";
export * from "./components/SystemMessage";
// SettingsForm'da CheckboxOption çakışması — Checkbox/CheckboxOption öncelikli,
// SettingsForm'un kendi CheckboxOption'ı (farklı tip) hariç tutuldu.
export { SettingsForm } from "./components/SettingsForm";
export type {
  SettingsFormProps,
  SettingsTab,
  Section,
  Field,
  SelectOption,
  CompositeControl,
  CodeGroup,
} from "./components/SettingsForm";
export * from "./features/auth";
export * from "./features/layout";

// ── i18n — Namespace sabitleri ve anahtar tipleri ────────────
export type { ScAuthKeys, ScLayoutKeys } from "./i18n/keys";
export { SC_AUTH_NS, SC_LAYOUT_NS } from "./i18n/keys";

// ── Grafik Bileşenleri (Recharts) ────────────────────────────
export * from "./components/Charts/BarChart";
export * from "./components/Charts/DonutChart";
export * from "./components/Charts/LineChart";
export * from "./components/Charts/SlaGauge";
