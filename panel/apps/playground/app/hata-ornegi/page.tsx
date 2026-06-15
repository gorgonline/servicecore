"use client";

import { useState } from "react";
import { Heading, Text } from "@servicecoreui/ui";
import { Button } from "@servicecoreui/ui";
import styles from "./hata-ornegi.module.css";

export default function HataOrnegiPage() {
  const [boom, setBoom] = useState(false);
  // Render sırasında fırlatılan hata → error.tsx (500) boundary'si yakalar.
  if (boom) throw new Error("Demo: kasıtlı hata — error boundary testi.");

  return (
    <div className={styles.wrap}>
      <Heading level={3}>Error Boundary demosu</Heading>
      <Text color="secondary">
        Butona bastığında render sırasında bir hata fırlatılır; uygulama otomatik olarak
        error.tsx (500) ekranını gösterir.
      </Text>
      <Button type="primary" size="large" onClick={() => setBoom(true)}>
        Hatayı tetikle
      </Button>
    </div>
  );
}
