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
} from "@carbon/icons-react";
import { Display, Heading, Text, Eyebrow } from "@servicecore/ui";
import { Card, Flex } from "@servicecore/ui/wraps";

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
        <Eyebrow tone="accent">@servicecore/ui v0.0.1</Eyebrow>
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
