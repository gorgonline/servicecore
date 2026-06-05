/* @servicecoreui/ui/icons — Carbon Design System ikonları, paketten re-export.
 *
 * Consumer @carbon/icons-react'i ayrı kurmaz; tek bağımlılık @servicecoreui/ui:
 *   import { Add, Search, ChevronDown } from "@servicecoreui/ui/icons";
 *
 * Carbon build'de `external` — dist'e gömülmez, paket bağımlılığı olarak gelir;
 * tree-shaking ile yalnız kullanılan ikon bundle'a girer. Server-safe (RSC uyumlu). */

export * from "@carbon/icons-react";
