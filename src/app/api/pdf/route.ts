
import { NextRequest, NextResponse } from 'next/server';
import pdfParse from 'pdf-parse';

function compressPDFText(text: string): string {
    // Remove leading/trailing whitespace from each line and join lines
    const compressedText = text
        .split('\n')
        .map(line => line.trim()) // Trim whitespace from each line
        .filter(line => line.length > 0) // Remove empty lines
        .join(' '); // Join lines with a single space

    // Further reduce multiple spaces to a single space
    return compressedText.replace(/\s+/g, ' ');
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        console.log('PDF text:', formData);
        const file = formData.get('file')
        console.log("file", file)

        if (!file || !(file instanceof File)) {
            return NextResponse.json({ error: 'No file provided or file is not valid' }, { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        console.log("ArrayBuffer created successfully");


        const pdfBuffer = Buffer.from(arrayBuffer);
        console.log("PDF Buffer created successfully");


        const parsedData = await pdfParse(pdfBuffer);
        console.log("PDF parsed successfully");

        
        console.log('uncompressed PDF text:', parsedData.text);
        const text = compressPDFText(parsedData.text);
        console.log("####\n compressed text:", text);
        return NextResponse.json({ text: text });


    } catch (error) {
        console.error('Error parsing PDF:', error)
        // return NextResponse.json({ error: 'Internal Server Error: Failed to parse PDF' }, { status: 500 })
    }
}