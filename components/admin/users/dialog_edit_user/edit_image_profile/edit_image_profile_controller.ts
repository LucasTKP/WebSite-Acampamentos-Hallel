import { UserModel } from "@/models/user";
import { getUsersTable, updateUser } from "@/repositories/userFireStore";
import { deleteFile, uploadImageProfile } from "@/repositories/userStorage";
import heic2any from "heic2any";
import { ChangeEvent } from "react";
import { ReactCropperElement } from "react-cropper";
import { toast } from "react-toastify";

interface SaveImageProfile {
  cropperRef: React.RefObject<ReactCropperElement>;
  file: File;
  user: UserModel;
  maxUsersTable: number;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
  setUserSelect: React.Dispatch<React.SetStateAction<UserModel | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export async function SaveImageProfile({
  cropperRef,
  file,
  user,
  maxUsersTable,
  setUsers,
  setUserSelect,
  setIsLoading,
}: SaveImageProfile) {
  setIsLoading(true);
  setUserSelect(null);
  const cropper = cropperRef.current?.cropper;

  if (!cropper) {
    toast.error("Erro ao acessar o cropper");
    return;
  }

  const namePhoto = file.name + Math.floor(Math.random() * 101);
  const path = `imageProfile/${user.id}/${namePhoto}`;

  try {
    const blobImage = await getBlobFromCanvas(cropper);

    if (blobImage) {
      const url = await uploadImageProfile({ blobImage, path });
      await onUpdateUser({ user, namePhoto, photoUrl: url });

      setUsers(await getUsersTable(maxUsersTable));

      if (user.namePhoto !== "jesus.jpg") {
        const pathDeletePhoto = `imageProfile/${user.id}/${user.namePhoto}`;
        await deleteFile(pathDeletePhoto);
      }

      toast.success("Imagem salva com sucesso");
    }
  } catch (e) {
    toast.error("Erro ao salvar imagem");
  } finally {
    setUserSelect(null);
    setIsLoading(false);
  }
}

const getBlobFromCanvas = (cropper: Cropper): Promise<Blob | null> => {
  return new Promise((resolve) => {
    cropper
      .getCroppedCanvas({
        width: 500,
        height: 500,
        imageSmoothingEnabled: false,
        imageSmoothingQuality: "low",
      })
      .toBlob((blob) => {
        resolve(blob);
      });
  });
};

interface handleFileChange {
  event: ChangeEvent<HTMLInputElement>;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  inputFileRef: React.RefObject<HTMLInputElement>;
}

export async function handleFileChange({
  event,
  setFile,
  inputFileRef,
}: handleFileChange) {
  if (event.target.files?.length) {
    let file = event.target.files[0];
    if (file.size > 30000000) {
      toast.error("A imagem que você selecionou é muito grande");
      return;
    }

    try {
      if (file.type === "image/heic" || file.name.includes(".heic")) {
        const newImage = await heic2any({
          blob: file,
          toType: "image/jpeg",
          quality: 1,
        });

        file = blobToFile({ theBlob: newImage, fileName: file });
      }

      if (!file.type.includes("image")) {
        toast.error(
          "O arquivo que você selecionou não é uma imagem png/jpg/jpeg/heic"
        );
        return;
      }
      setFile(file);
    } catch (e) {
      toast.error("Erro ao converter a imagem HEIC");
    } finally {
      clearFileInput(inputFileRef);
    }
  }
}

export function clearFileInput(
  inputFileRef: React.RefObject<HTMLInputElement>
) {
  if (inputFileRef.current) {
    inputFileRef.current.value = "";
  }
}

interface OnUpdateUserProps {
  user: UserModel;
  namePhoto: string;
  photoUrl: string;
}
async function onUpdateUser({ user, namePhoto, photoUrl }: OnUpdateUserProps) {
  const newUser = {
    ...user,
    namePhoto,
    photoUrl: photoUrl,
  };
  await updateUser(newUser);
}

function blobToFile({ theBlob, fileName }: { theBlob: any; fileName: File }) {
  return new File([theBlob], fileName.name, {
    lastModified: new Date().getTime(),
    type: theBlob.type,
  });
}
