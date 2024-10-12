'use client';
import CodeComparison from "@/components/magicui/code-comparison";

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

export function SampleCode() {
    return (
        <CodeComparison
            beforeCode={beforeCode}
            afterCode={afterCode}
            language="typescript"
            filename="sudodev.ts"
            lightTheme="github-light"
            darkTheme="github-dark"
        />
    );
}
