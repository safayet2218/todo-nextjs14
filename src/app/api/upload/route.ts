import { writeFile, mkdir } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import { join, dirname } from 'path';

export async function POST(request: NextRequest) {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
        return NextResponse.json({ success: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    const directory = join(process.cwd(), 'temp'); // Adjust the directory path as needed
    const path = join(directory, file.name);
    
    try {
        await mkdir(dirname(path), { recursive: true }); // Ensure directory exists
        await writeFile(path, buffer);
        console.log(`Open ${path} to see the uploaded file`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving file:', error);
        return NextResponse.json({ success: false, error: error.message });
    }
}