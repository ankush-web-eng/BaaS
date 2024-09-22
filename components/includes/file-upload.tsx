import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { codeSnippet } from "./file-upload";

const FileContentDisplay = () => {
  const { toast } = useToast();

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet)
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "File content has been copied",
        });
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
        toast({
          title: "Error",
          description: "Failed to copy content",
          variant: "destructive",
        });
      });
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Code Snippet Display</h2>
      <Card className="w-full max-w-4xl mx-auto mt-4 border border-gray-300 dark:border-gray-700">
        <CardContent className="relative p-4">
          {codeSnippet ? (
            <>
              <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-sm text-black dark:text-white">
                <code>{codeSnippet}</code>
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white dark:bg-gray-800"
                onClick={handleCopyToClipboard}
              >
                <CopyIcon className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <p className="text-red-500">Code snippet is empty or undefined</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FileContentDisplay;