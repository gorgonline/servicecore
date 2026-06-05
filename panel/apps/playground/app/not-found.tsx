import Link from "next/link";
import { Button } from "@servicecoreui/ui/wraps";
import { SystemMessage } from "./_components/SystemMessage";

export default function NotFound() {
  return (
    <SystemMessage
      code="404"
      title="Sayfa bulunamadı"
      description="Aradığın sayfa taşınmış, adı değişmiş ya da hiç var olmamış olabilir."
      action={
        <Link href="/">
          <Button type="primary" size="large">
            Ana sayfaya dön
          </Button>
        </Link>
      }
    />
  );
}
