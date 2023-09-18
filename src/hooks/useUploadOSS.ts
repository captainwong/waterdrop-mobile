import { useQuery } from "@apollo/client"
import GET_OSS_INFO from "../graphql/oss"

const useUploadOSS = () => {
  const { data: d } = useQuery(GET_OSS_INFO);
  console.log(d);

  const upload = async (file: File) => {
    console.log(file);
    const formData = new FormData();
    const data = d.getOSSInfo;
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}.${ext}`;
    const key = `images/${fileName}`;
    formData.append('key', key);
    formData.append('policy', data.policy);
    formData.append('OSSAccessKeyId', data.accessId);
    formData.append('success_action_status', '200');
    formData.append('signature', data.signature);
    formData.append('file', file);
    const res = await fetch(data.host, {
      method: 'POST',
      body: formData,
    });
    console.log(res);
    return { url: res.url + key };
  };

  return upload;
};

export default useUploadOSS;
