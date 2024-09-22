export const codeSnippet = `
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
        console.error(error)
    }
}`;