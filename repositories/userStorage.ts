import { storage } from "@/lib/firebase_config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";

interface UploadFileProps {
  file: File;
  path: string;
}
export async function uploadFile({
  file,
  path,
}: UploadFileProps): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(ref(storage, path));
  return url;
}

interface UploadImageProfileProps {
  blobImage: Blob;
  path: string;
}

export async function uploadImageProfile({
  blobImage,
  path,
}: UploadImageProfileProps): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blobImage);
  const url = await getDownloadURL(ref(storage, path));
  return url;
}

interface UploadExcelPresences {
  blobImage: Blob;
  path: string;
}

export async function uploadExcelPresences({
  blobImage: blobExcel,
  path,
}: UploadExcelPresences): Promise<string> {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, blobExcel);
  const url = await getDownloadURL(ref(storage, path));
  return url;
}


export async function deleteFile(pathDeleteImage: string) {
  const desertRef = ref(storage, pathDeleteImage);
  await deleteObject(desertRef);
}
