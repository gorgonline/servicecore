import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Önbelleği devre dışı bırakıyoruz, veri her zaman taze gelsin
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), '.gemini/tracker/orchestrator-state.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'State not found' }, { status: 404 });
  }
}
