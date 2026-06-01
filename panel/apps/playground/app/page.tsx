"use client";

import Link from "next/link";
import {
  ColorPalette,
  Txt,
  TextFont,
  Catalog,
  Tag as TagIcon,
  Notification as NotificationIcon,
  UserAvatar,
  HelpDesk,
  Link as LinkIcon,
  Subtract,
  Grid as LayoutIcon,
  Touch_1 as ButtonIcon,
  ChevronDown,
  ChevronRight,
  WarningAlt,
  ArrowRight,
  Dashboard,
  Menu as MenuIcon,
  Flow,
  OpenPanelTop,
  CheckboxChecked,
  ColorPicker as ColorPickerIcon,
  Calendar,
  DocumentTasks,
  Hashtag,
  At,
  RadioButtonChecked,
  Star,
  SettingsAdjust,
  Switch as SwitchIcon,
  Time,
  Migrate,
  TreeView,
  CloudUpload,
  Calendar as CalendarIcon,
  CarouselHorizontal,
  RowExpand,
  InformationSquare,
  Box,
  Image as ImageIcon,
  ChatLaunch,
  QrCode,
  Choices,
  Analytics,
  DataTable,
  Activity as ActivityIcon,
  Help,
  DecisionTree,
  OpenPanelFilledLeft,
  Popup,
  NotificationNew,
  CheckmarkOutline,
  MeterAlt,
  Result as ResultIcon,
  TextLineSpacing,
  InProgress,
} from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow } from "@servicecoreui/ui";
import { Card, Flex } from "@servicecoreui/ui/wraps";

type Item = {
  name: string;
  href: string;
  icon: React.ReactNode;
  desc: string;
};

type Group = {
  label: string;
  items: Item[];
};

const groups: Group[] = [
  {
    label: "Foundations",
    items: [
      {
        name: "Tokens",
        href: "/tokens",
        icon: <ColorPalette />,
        desc: "Renk, radius, spacing, type",
      },
      {
        name: "Typography",
        href: "/typography",
        icon: <TextFont />,
        desc: "Heading, Display, Text, Eyebrow",
      },
    ],
  },
  {
    label: "Layout",
    items: [
      {
        name: "Flex",
        href: "/flex",
        icon: <LayoutIcon />,
        desc: "Block-level flex helper",
      },
      {
        name: "Divider",
        href: "/dividers",
        icon: <Subtract />,
        desc: "Bölücü çizgi (yatay/dikey)",
      },
    ],
  },
  {
    label: "Navigation",
    items: [
      {
        name: "Anchor",
        href: "/anchors",
        icon: <LinkIcon />,
        desc: "Scroll spy — section TOC (vertical/horizontal)",
      },
      {
        name: "Breadcrumb",
        href: "/breadcrumbs",
        icon: <ChevronRight />,
        desc: "Sayfa hiyerarşisi: Ana sayfa › Panolar › IKD PANO",
      },
      {
        name: "Dropdown",
        href: "/dropdowns",
        icon: <ChevronDown />,
        desc: "Trigger'a bağlı menü, split button, context menu",
      },
      {
        name: "Menu",
        href: "/menus",
        icon: <MenuIcon />,
        desc: "Persistent nav — sider, top nav, popup (inline/horizontal/vertical)",
      },
      {
        name: "Steps",
        href: "/steps",
        icon: <Flow />,
        desc: "Yaşam döngüsü, wizard, onay akışı, incident timeline",
      },
      {
        name: "Tabs",
        href: "/tabs",
        icon: <OpenPanelTop />,
        desc: "Peer-level sekme — ticket detail, settings, dashboard view",
      },
    ],
  },
  {
    label: "Display",
    items: [
      {
        name: "Card",
        href: "/cards",
        icon: <Catalog />,
        desc: "Widget, form section, list item",
      },
      {
        name: "Tag",
        href: "/tags",
        icon: <TagIcon />,
        desc: "Status, kategori etiketi",
      },
      {
        name: "Badge",
        href: "/badges",
        icon: <NotificationIcon />,
        desc: "Sayı/dot/ribbon overlay",
      },
      {
        name: "Avatar",
        href: "/avatars",
        icon: <UserAvatar />,
        desc: "Image, initials, icon",
      },
    ],
  },
  {
    label: "Form",
    items: [
      {
        name: "Button",
        href: "/buttons",
        icon: <ButtonIcon />,
        desc: "5 type + danger + size",
      },
      {
        name: "FloatButton",
        href: "/float-buttons",
        icon: <HelpDesk />,
        desc: "Sayfa düzeyi sabit buton + Group + BackTop",
      },
      {
        name: "Input",
        href: "/inputs",
        icon: <Txt />,
        desc: "Text, Search, Password, TextArea",
      },
      {
        name: "Select",
        href: "/selects",
        icon: <ChevronDown />,
        desc: "Single, multiple, tags, search",
      },
      {
        name: "Checkbox",
        href: "/checkboxes",
        icon: <CheckboxChecked />,
        desc: "Çoklu seçim, indeterminate, Group, bulk-select",
      },
      {
        name: "ColorPicker",
        href: "/color-picker",
        icon: <ColorPickerIcon />,
        desc: "Tag/kategori rengi, preset paletler, controlled state",
      },
      {
        name: "DatePicker",
        href: "/date-picker",
        icon: <Calendar />,
        desc: "Tarih + saat + range, presets, disabledDate, TR locale",
      },
      {
        name: "Form",
        href: "/form",
        icon: <DocumentTasks />,
        desc: "useForm, validation, Form.List, useWatch, methods",
      },
      {
        name: "InputNumber",
        href: "/input-number",
        icon: <Hashtag />,
        desc: "Sayısal input — min/max/step, precision, formatter/parser",
      },
      {
        name: "Mentions",
        href: "/mentions",
        icon: <At />,
        desc: "@ kişi / # kanal tag'leme, autocomplete, multi-prefix",
      },
      {
        name: "Radio",
        href: "/radio",
        icon: <RadioButtonChecked />,
        desc: "Tek seçim, Group, button mode (segmented), options",
      },
      {
        name: "Rate",
        href: "/rate",
        icon: <Star />,
        desc: "Yıldız rating — CSAT, allowHalf, tooltips, custom character",
      },
      {
        name: "Slider",
        href: "/slider",
        icon: <SettingsAdjust />,
        desc: "Sürekli/range değer — threshold, marks, tooltip, vertical",
      },
      {
        name: "Switch",
        href: "/switch",
        icon: <SwitchIcon />,
        desc: "Binary on/off — anında uygulanan settings, loading, labels",
      },
      {
        name: "TimePicker",
        href: "/time-picker",
        icon: <Time />,
        desc: "Saat seçimi + range, format, step, disabledTime",
      },
      {
        name: "Transfer",
        href: "/transfer",
        icon: <Migrate />,
        desc: "İki kolonlu item taşıma — assignment, permission, search",
      },
      {
        name: "TreeSelect",
        href: "/tree-select",
        icon: <TreeView />,
        desc: "Hiyerarşik select — kategori, organizasyon, treeCheckable",
      },
      {
        name: "Upload",
        href: "/upload",
        icon: <CloudUpload />,
        desc: "Dosya yükleme — Dragger, picture-card, avatar, validation",
      },
      {
        name: "Calendar",
        href: "/calendar",
        icon: <CalendarIcon />,
        desc: "Takvim widget'ı — etkinlik göstergesi, fullscreen/compact",
      },
      {
        name: "Carousel",
        href: "/carousel",
        icon: <CarouselHorizontal />,
        desc: "Slide rotasyonu — splash, KPI rotation, onboarding tour",
      },
      {
        name: "Collapse",
        href: "/collapse",
        icon: <RowExpand />,
        desc: "Accordion / açılır panel — FAQ, settings, ticket sections",
      },
      {
        name: "Descriptions",
        href: "/descriptions",
        icon: <InformationSquare />,
        desc: "Tek nesne key-value detay — ticket meta, asset info, profile",
      },
      {
        name: "Empty",
        href: "/empty",
        icon: <Box />,
        desc: "Boş durum — listede veri yok, search no result, CTA",
      },
      {
        name: "Image",
        href: "/image",
        icon: <ImageIcon />,
        desc: "Resim + preview (zoom/rotate), fallback, gallery",
      },
      {
        name: "QRCode",
        href: "/qr-code",
        icon: <QrCode />,
        desc: "QR kod — mobile login, 2FA, asset tag, expire+refresh",
      },
      {
        name: "Segmented",
        href: "/segmented",
        icon: <Choices />,
        desc: "Segmented control — view switcher, time range, filter",
      },
      {
        name: "Statistic",
        href: "/statistic",
        icon: <Analytics />,
        desc: "Sayısal KPI — dashboard, precision, prefix/suffix, countdown",
      },
      {
        name: "Table",
        href: "/table",
        icon: <DataTable />,
        desc: "ITSM omurgası — sort/filter/pagination/selection/expand/fixed",
      },
      {
        name: "Timeline",
        href: "/timeline",
        icon: <ActivityIcon />,
        desc: "Dikey aktivite log — ticket activity, change workflow, RCA",
      },
      {
        name: "Tree",
        href: "/tree",
        icon: <DecisionTree />,
        desc: "Hiyerarşik widget — asset, permission, file explorer, checkable",
      },
    ],
  },
  {
    label: "Feedback",
    items: [
      {
        name: "Alert",
        href: "/alerts",
        icon: <WarningAlt />,
        desc: "Persistent uyarı/info kutusu",
      },
      {
        name: "Popover",
        href: "/popover",
        icon: <ChatLaunch />,
        desc: "Title + content + action — user preview, action menu, help",
      },
      {
        name: "Tooltip",
        href: "/tooltip",
        icon: <Help />,
        desc: "Sade ipucu — icon button, kısaltma, disabled neden",
      },
      {
        name: "Drawer",
        href: "/drawer",
        icon: <OpenPanelFilledLeft />,
        desc: "Yandan açılır panel — bilet detay, filter, form modal alt.",
      },
      {
        name: "Message",
        href: "/message",
        icon: <NotificationIcon />,
        desc: "Toast/snackbar — kısa feedback, success/error/loading, useMessage hook",
      },
      {
        name: "Modal",
        href: "/modal",
        icon: <Popup />,
        desc: "Merkezi diyalog — confirm, form, detay. Modal.confirm + useModal hook",
      },
      {
        name: "Notification",
        href: "/notification",
        icon: <NotificationNew />,
        desc: "Köşede bildirim — title + description + action btn, 6 placement",
      },
      {
        name: "Popconfirm",
        href: "/popconfirm",
        icon: <CheckmarkOutline />,
        desc: "Inline confirm popup — table row delete, hızlı evet/hayır",
      },
      {
        name: "Progress",
        href: "/progress",
        icon: <MeterAlt />,
        desc: "İlerleme — line / circle / dashboard, upload + SLA + KPI",
      },
      {
        name: "Result",
        href: "/result",
        icon: <ResultIcon />,
        desc: "Akış sonucu sayfası — success / error / 404 / 403 / 500 + action",
      },
      {
        name: "Skeleton",
        href: "/skeleton",
        icon: <TextLineSpacing />,
        desc: "Yer tutucu iskelet — card/table/detay loading, layout shift sıfır",
      },
      {
        name: "Spin",
        href: "/spin",
        icon: <InProgress />,
        desc: "Süre belirsiz loading — save button, fetch overlay, custom indicator",
      },
    ],
  },
];

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: 1100,
        margin: "0 auto",
        padding: "var(--sc-space-16) var(--sc-space-6)",
      }}
    >
      <Flex vertical gap="large" style={{ marginBottom: "var(--sc-space-12)" }}>
        <Eyebrow tone="accent">@servicecoreui/ui v0.0.1</Eyebrow>
        <Display size="lg">ServiceCore UI</Display>
        <Text size="lg" color="secondary" style={{ maxWidth: 640 }}>
          AntD 5.7 wrap + Carbon icon + OKLCH token sistemi. Her bileşenin
          rehber sayfasında <strong>ne zaman kullan</strong>, <strong>ne zaman değil</strong>{" "}
          ve ServiceCore'a özel mock'lar var.
        </Text>
      </Flex>

      <Flex vertical gap="large">
        {groups.map((group) => (
          <section key={group.label}>
            <Flex
              justify="space-between"
              align="baseline"
              style={{ marginBottom: "var(--sc-space-4)" }}
            >
              <Eyebrow tone="default">{group.label}</Eyebrow>
              <Text size="xs" color="tertiary">
                {group.items.length} bileşen
              </Text>
            </Flex>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: "var(--sc-space-3)",
              }}
            >
              {group.items.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  style={{ textDecoration: "none" }}
                >
                  <Card clickable size="small">
                    <Flex justify="space-between" align="flex-start" gap="small">
                      <Flex vertical gap="small" style={{ flex: 1 }}>
                        <Flex
                          align="center"
                          justify="center"
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "var(--sc-radius-md)",
                            background: "var(--sc-color-accent-subtle)",
                            color: "var(--sc-color-accent)",
                          }}
                        >
                          {item.icon}
                        </Flex>
                        <Heading level={5}>{item.name}</Heading>
                        <Text size="xs" color="secondary">
                          {item.desc}
                        </Text>
                      </Flex>
                      <ArrowRight
                        size={14}
                        style={{ color: "var(--sc-color-text-tertiary)", marginTop: 4 }}
                      />
                    </Flex>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        ))}

        {/* Application — Shell, vurgulu */}
        <section>
          <Eyebrow tone="accent" style={{ marginBottom: "var(--sc-space-4)", display: "inline-block" }}>
            Application
          </Eyebrow>
          <Link href="/shell" style={{ textDecoration: "none" }}>
            <Card clickable>
              <Flex justify="space-between" align="center" gap="middle">
                <Flex gap="middle" align="center" style={{ flex: 1 }}>
                  <Flex
                    align="center"
                    justify="center"
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "var(--sc-radius-md)",
                      background: "var(--sc-color-accent)",
                      color: "var(--sc-color-accent-on-accent)",
                    }}
                  >
                    <Dashboard size={24} />
                  </Flex>
                  <Flex vertical gap="small">
                    <Heading level={3}>Shell — Panel Önizleme</Heading>
                    <Text size="sm" color="secondary">
                      25 modül sidebar + PageHeader + KPI strip + widget grid. AntD Layout +
                      bizim component'ler ile gerçek panel.
                    </Text>
                  </Flex>
                </Flex>
                <ArrowRight size={20} style={{ color: "var(--sc-color-accent)" }} />
              </Flex>
            </Card>
          </Link>
        </section>
      </Flex>
    </main>
  );
}
