'use client';
import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CodeBlockProps {
    code: string;
    language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative mb-4">
            <button
                onClick={handleCopy}
                className="absolute top-2 right-2 p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
            >
                <Copy size={16} color="white" />
            </button>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                }}
            >
                {code}
            </SyntaxHighlighter>
            {copied && (
                <Alert className="mt-2 bg-green-100 border-green-400 text-green-700">
                    <AlertDescription>Copied to clipboard!</AlertDescription>
                </Alert>
            )}
        </div>
    );
};

const CodeDisplay = () => {
    const beforeCode = `
const UploadFile = async (file: File) => {
    if (!file) {
        setError('No file selected');
        return;
    }
    try {
        const formData = new FormData();
        formData.append("file", file as File);
        const res = await axios.post('https://api.devx.ankushsingh.tech/service/upload-file', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "Accept": "application/json",
                "API_KEY": "your_api_key_here"
            }
        })
        console.log(res.data);
    } catch (error) {
        const axiosError = error as AxiosError<string>;
        alert(axiosError.response?.data);
        console.error(axiosError?.response);
    }
}`;

    const afterCode = `
const handleSubmit = async (to:string[], from: string, body:string, subject:string) => {

    const emailData = {
        to,
        subject,
        body,
        from
    };

    console.log("Email Data: ", emailData);
    try {
        const res = await axios.post('https://api.devx.ankushsingh.tech/service/send-mail', emailData, {
            headers: {
                "API_KEY": "your_api_key_here"
            }
        });
        console.log("Response: ", res.data);
    } catch (error) {
        console.error("Error sending email: ", error);
        const axiosError = error as AxiosError<string>;
        const errorMessage = axiosError.response?.data || axiosError.message;
        console.log(errorMessage);
    }
};`;

    return (
        <div className="md:px-6 px-3 py-3 md:py-6 bg-white dark:bg-black w-full text-black dark:text-neutral-200 rounded-xl">
            <h2 className="text-2xl font-bold mb-4">Code Snippets</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                <CodeBlock code={beforeCode} language="typescript" />
                <CodeBlock code={afterCode} language="typescript" />
            </div>
        </div>
    );
};

export default CodeDisplay;