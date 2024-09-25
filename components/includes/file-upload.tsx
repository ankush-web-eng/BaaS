import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const UploadFileDemoCode = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { toast } = useToast();

  const codeSnippet = `
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
        setUrl(res.data);
    } catch (error) {
        const axiosError = error as AxiosError<string>;
        alert(axiosError.response?.data);
        console.error(axiosError?.response);
    }
}`;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(codeSnippet.trim())
      .then(() => {
        toast({
          title: "Copied to clipboard",
          description: "Code snippet has been copied",
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-xl font-bold mb-4">Code Snippet Display</h2>
      <Card className="">
        <CardContent className="relative p-4">
          <pre className={`bg-[#010629b0] p-4 rounded-md overflow-x-auto text-sm text-black dark:text-white ${isExpanded ? '' : 'max-h-40'}`}>
            <code>{codeSnippet.trim()}</code>
          </pre>
          <div className="absolute top-2 right-2 flex space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className=""
              onClick={handleCopyToClipboard}
            >
              <CopyIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-white dark:bg-gray-800"
              onClick={toggleExpand}
            >
              {isExpanded ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />}
            </Button>
          </div>
          {!isExpanded && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none" />
          )}
        </CardContent>
      </Card>
      {!isExpanded && (
        <Button
          variant="ghost"
          className="mt-2 w-full"
          onClick={toggleExpand}
        >
          Expand
        </Button>
      )}
    </div>
  );
};

export default UploadFileDemoCode;