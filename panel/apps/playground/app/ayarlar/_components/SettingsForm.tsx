"use client";

/* ════════════════════════════════════════════════════════════════════════
 * SettingsForm — data-driven ayar formu (tüm ayar detay sayfalarında ortak).
 *
 * Şema (SettingsTab[]) verilir; renderer alan tipine göre DOĞRU kontrolü basar:
 *   text/url → Input · select → Select · switch → Switch · color → ColorPicker
 *   upload → Upload (picture-card) · code → Input.TextArea (monospace)
 *
 * Layout kararları (orijinali kopyalamadan, en iyi UX):
 *   • Aç/kapa = Switch (checkbox değil)
 *   • Renkler = ColorPicker, 2 kolon grid
 *   • Kod (CSS/JS) = Collapse/accordion (sayfayı uzatmaz, ileri-seviye)
 *   • Kompakt alanlar 2 kolon; switch/kod tam genişlik
 * ════════════════════════════════════════════════════════════════════════ */

import { createContext, useContext, useState } from "react";
import { Add, Checkmark, ChevronDown, Search } from "@carbon/icons-react";
import { Heading, Text } from "@servicecoreui/ui";
import {
  Button,
  Checkbox,
  Collapse,
  ColorPicker,
  Input,
  InputNumber,
  Select,
  Switch,
  Upload,
} from "@servicecoreui/ui/wraps";
import styles from "./SettingsForm.module.css";

export type SelectOption = { value: string; label: string };

/** full → grid'de tüm kolonları kaplar; help → kontrol altı küçük açıklama;
 * dependsOn → bu switch (key) açık olmadıkça alan GİZLENİR (koşullu alan). */
type FieldBase = { key: string; label: string; full?: boolean; help?: string; dependsOn?: string };

/** composite alan içi yan yana kontroller. */
export type CompositeControl =
  | { key: string; control: "number"; defaultValue?: number; placeholder?: string; min?: number; max?: number }
  | { key: string; control: "text"; defaultValue?: string; placeholder?: string }
  | { key: string; control: "select"; options: SelectOption[]; defaultValue?: string; placeholder?: string; searchable?: boolean };

export type Field =
  | (FieldBase & { type: "text" | "url"; placeholder?: string; defaultValue?: string })
  | (FieldBase & { type: "number"; placeholder?: string; defaultValue?: number; min?: number; max?: number; wide?: boolean })
  | (FieldBase & { type: "select"; options: SelectOption[]; defaultValue?: string; placeholder?: string; searchable?: boolean })
  | (FieldBase & { type: "tags"; defaultValue?: string[]; placeholder?: string; options?: SelectOption[] })
  | (FieldBase & { type: "multiselect"; options: SelectOption[]; defaultValue?: string[]; placeholder?: string; searchable?: boolean })
  | (FieldBase & { type: "switch"; defaultChecked?: boolean })
  | (FieldBase & { type: "color"; defaultValue?: string })
  | (FieldBase & { type: "upload" })
  | (FieldBase & { type: "code"; language: "css" | "js"; rows?: number })
  | (FieldBase & { type: "textarea"; placeholder?: string; defaultValue?: string; rows?: number })
  | (FieldBase & { type: "composite"; controls: CompositeControl[] });

export type CodeGroup = { key: string; title: string; fields: Field[] };
export type CheckboxOption = { key: string; label: string; defaultChecked?: boolean };

export type Section =
  | { key: string; title?: string; layout: "grid" | "uploads" | "stack"; fields: Field[] }
  | { key: string; title?: string; layout: "code"; groups: CodeGroup[] }
  | { key: string; title?: string; layout: "checkboxes"; options: CheckboxOption[] };

export type SettingsTab = { key: string; label: string; sections: Section[] };

const cx = (...parts: (string | undefined | false)[]) => parts.filter(Boolean).join(" ");

/* Switch değerleri context'i — koşullu alanlar (dependsOn) buradan okunur. */
const SwitchCtx = createContext<{
  values: Record<string, boolean>;
  setValue: (k: string, v: boolean) => void;
}>({ values: {}, setValue: () => {} });

/** Şemadaki tüm switch'lerin başlangıç değerlerini topla (dependsOn için). */
function collectSwitchDefaults(tabs: SettingsTab[]): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const t of tabs) {
    for (const s of t.sections) {
      if (s.layout === "grid" || s.layout === "uploads" || s.layout === "stack") {
        for (const f of s.fields) {
          if (f.type === "switch") out[f.key] = f.defaultChecked ?? false;
        }
      }
    }
  }
  return out;
}

/** composite içi tekil kontrol. */
function CompositeControlView({ control }: { control: CompositeControl }) {
  if (control.control === "select") {
    return (
      <Select
        className={styles.compositeSelect}
        defaultValue={control.defaultValue}
        placeholder={control.placeholder}
        searchInPopup={control.searchable}
        options={control.options}
      />
    );
  }
  if (control.control === "number") {
    return (
      <InputNumber
        className={styles.compositeNum}
        defaultValue={control.defaultValue}
        placeholder={control.placeholder}
        min={control.min}
        max={control.max}
      />
    );
  }
  return (
    <Input
      className={styles.compositeText}
      defaultValue={control.defaultValue}
      placeholder={control.placeholder}
    />
  );
}

/** Alan kontrolü — tip → doğru bileşen. */
function FieldControl({ field }: { field: Field }) {
  const { values, setValue } = useContext(SwitchCtx);
  switch (field.type) {
    case "text":
    case "url":
      return <Input defaultValue={field.defaultValue} placeholder={field.placeholder} />;
    case "number":
      return (
        <InputNumber
          className={field.wide ? styles.numInputWide : styles.numInput}
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          min={field.min}
          max={field.max}
        />
      );
    case "select":
      return (
        <Select
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          style={{ width: "100%" }}
          searchInPopup={field.searchable}
          options={field.options}
        />
      );
    case "tags":
      return (
        <Select
          mode="tags"
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          options={field.options}
          style={{ width: "100%" }}
        />
      );
    case "multiselect":
      return (
        <Select
          mode="multiple"
          defaultValue={field.defaultValue}
          placeholder={field.placeholder}
          options={field.options}
          searchInPopup={field.searchable}
          style={{ width: "100%" }}
        />
      );
    case "color":
      return <ColorPicker defaultValue={field.defaultValue} showText />;
    case "switch":
      return (
        <Switch
          checked={values[field.key] ?? field.defaultChecked ?? false}
          onChange={(v) => setValue(field.key, v)}
        />
      );
    case "upload":
      return (
        <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
          <span className={styles.uploadInner}>
            <Add size={20} />
            <span>Yükle</span>
          </span>
        </Upload>
      );
    case "code":
      return (
        <Input.TextArea
          className={styles.codeArea}
          rows={field.rows ?? 4}
          placeholder={field.language === "css" ? "/* CSS */" : "// JavaScript"}
        />
      );
    case "textarea":
      return (
        <Input.TextArea
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          defaultValue={field.defaultValue}
        />
      );
    case "composite":
      return (
        <div className={styles.composite}>
          {field.controls.map((c) => (
            <CompositeControlView key={c.key} control={c} />
          ))}
        </div>
      );
  }
}

/** Etiketli alan — switch'te etiket yanda, diğerlerinde üstte. */
function FieldRow({ field, className }: { field: Field; className?: string }) {
  const { values } = useContext(SwitchCtx);
  // koşullu alan: bağlı switch açık değilse gizle
  if (field.dependsOn && !values[field.dependsOn]) return null;
  if (field.type === "switch") {
    return (
      <div className={cx(styles.switchField, className)}>
        <div className={styles.switchRow}>
          <FieldControl field={field} />
          <span className={styles.switchLabel}>{field.label}</span>
        </div>
        {field.help ? <span className={styles.fieldHelp}>{field.help}</span> : null}
      </div>
    );
  }
  // upload/composite'i <label> ile sarmak iç input'u tüm alana bağlar (tile/alan
  // dışı boşluğa tıklayınca tetiklenir) → bunlarda <div> kullan.
  const Wrap = field.type === "upload" || field.type === "composite" ? "div" : "label";
  return (
    <Wrap className={cx(styles.field, className)}>
      <span className={styles.label}>{field.label}</span>
      <FieldControl field={field} />
      {field.help ? <span className={styles.fieldHelp}>{field.help}</span> : null}
    </Wrap>
  );
}

function SectionView({ section }: { section: Section }) {
  return (
    <section className={styles.section}>
      {section.title ? <Heading level={5}>{section.title}</Heading> : null}

      {section.layout === "grid" ? (
        <div className={styles.grid}>
          {section.fields.map((f) => (
            <FieldRow
              key={f.key}
              field={f}
              className={f.type === "switch" || f.full ? styles.fieldFull : undefined}
            />
          ))}
        </div>
      ) : null}

      {section.layout === "stack" ? (
        <div className={styles.stack}>
          {section.fields.map((f) => (
            <FieldRow key={f.key} field={f} className={f.type === "composite" ? styles.fieldWide : undefined} />
          ))}
        </div>
      ) : null}

      {section.layout === "uploads" ? (
        <div className={styles.uploads}>
          {section.fields.map((f) => (
            <div key={f.key} className={styles.uploadField}>
              <span className={styles.label}>{f.label}</span>
              <FieldControl field={f} />
            </div>
          ))}
        </div>
      ) : null}

      {section.layout === "checkboxes" ? (
        <div className={styles.checkGrid}>
          {section.options.map((o) => (
            <Checkbox key={o.key} defaultChecked={o.defaultChecked}>
              {o.label}
            </Checkbox>
          ))}
        </div>
      ) : null}

      {section.layout === "code" ? (
        <Collapse
          ghost
          items={section.groups.map((g) => ({
            key: g.key,
            label: g.title,
            children: (
              <div className={styles.codeGroup}>
                {g.fields.map((f) => (
                  <label key={f.key} className={styles.codeField}>
                    <span className={styles.label}>{f.label}</span>
                    <FieldControl field={f} />
                  </label>
                ))}
              </div>
            ),
          }))}
        />
      ) : null}
    </section>
  );
}

/** Arama filtresi — başlık eşleşirse tüm bölüm, değilse eşleşen alanlar; yoksa null. */
function filterSection(section: Section, q: string): Section | null {
  if (!q) return section;
  const titleHit = (section.title ?? "").toLocaleLowerCase("tr").includes(q);
  if (titleHit) return section;
  if (section.layout === "checkboxes") {
    const options = section.options.filter((o) => o.label.toLocaleLowerCase("tr").includes(q));
    return options.length ? { ...section, options } : null;
  }
  if (section.layout === "code") return null;
  const fields = section.fields.filter((f) => f.label.toLocaleLowerCase("tr").includes(q));
  return fields.length ? { ...section, fields } : null;
}

export function SettingsForm({ tabs }: { tabs: SettingsTab[] }) {
  const [values, setValues] = useState(() => collectSwitchDefaults(tabs));
  const setValue = (k: string, v: boolean) => setValues((prev) => ({ ...prev, [k]: v }));
  const [activeTab, setActiveTab] = useState(() => tabs[0]?.key ?? "");
  const [activeSection, setActiveSection] = useState(() => tabs[0]?.sections[0]?.key ?? "");
  const [openAreas, setOpenAreas] = useState<string[]>(() => (tabs[0] ? [tabs[0].key] : []));
  const [query, setQuery] = useState("");

  const area = tabs.find((t) => t.key === activeTab) ?? tabs[0];
  const q = query.trim().toLocaleLowerCase("tr");

  if (!area) return null;

  const toggleArea = (key: string) =>
    setOpenAreas((p) => (p.includes(key) ? p.filter((k) => k !== key) : [...p, key]));

  const selectSection = (tabKey: string, sectionKey: string) => {
    setActiveTab(tabKey);
    setActiveSection(sectionKey);
    setOpenAreas((p) => (p.includes(tabKey) ? p : [...p, tabKey]));
    setQuery("");
  };

  // q varsa: alandaki tüm eşleşen bölümler; yoksa: yalnız seçili bölüm
  const displaySections = q
    ? area.sections.map((s) => filterSection(s, q)).filter((s): s is Section => s !== null)
    : area.sections.filter((s) => s.key === activeSection);

  return (
    <SwitchCtx.Provider value={{ values, setValue }}>
      <div className={styles.shell}>
        {/* Sol-nav: alanlar = açılır gruplar, bölümler = tree-girintili öğeler
            (DocsShell deseniyle aynı). */}
        <div className={styles.nav}>
          {tabs.map((t) => {
            const open = openAreas.includes(t.key);
            return (
              <div key={t.key} className={styles.navGroup}>
                <button
                  type="button"
                  className={styles.navGroupToggle}
                  onClick={() => toggleArea(t.key)}
                  aria-expanded={open}
                >
                  <span>{t.label}</span>
                  <ChevronDown
                    size={14}
                    className={`${styles.navChevron} ${open ? styles.navChevronOpen : ""}`}
                  />
                </button>
                {open ? (
                  <div className={styles.navGroupItems}>
                    {t.sections.map((s) => (
                      <button
                        key={s.key}
                        type="button"
                        className={`${styles.navItem} ${
                          activeTab === t.key && activeSection === s.key ? styles.navItemActive : ""
                        }`}
                        onClick={() => selectSection(t.key, s.key)}
                      >
                        {s.title ?? "Genel"}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Sağ içerik: arama + seçili bölüm (veya arama sonuçları) + Kaydet */}
        <div className={styles.content}>
          {area.sections.length === 0 ? (
            <Text color="tertiary">Bu sekmenin alanları yakında eklenecek.</Text>
          ) : (
            <>
              <Input
                allowClear
                prefix={<Search size={16} />}
                placeholder={`${area.label} içinde ara…`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.search}
              />
              {displaySections.length === 0 ? (
                <Text color="tertiary">&quot;{query}&quot; için sonuç yok.</Text>
              ) : (
                displaySections.map((s) => <SectionView key={s.key} section={s} />)
              )}
              <div className={styles.actions}>
                <Button type="primary" leadingIcon={<Checkmark />}>
                  Kaydet
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </SwitchCtx.Provider>
  );
}
