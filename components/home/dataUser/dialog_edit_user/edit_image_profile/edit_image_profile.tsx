"use client";
import React, { useContext, useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { CameraIcon } from "@radix-ui/react-icons";
import {
  SaveImageProfile,
  clearFileInput,
  handleFileChange,
} from "./edit_image_profile_controller";
import { toast } from "react-toastify";
import { UserContext } from "@/context/userContext";

function EditImageProfile({ closeDialog }: { closeDialog: () => void }) {
  const { user, setUser } = useContext(UserContext);
  const cropperRef = useRef<ReactCropperElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <div>
      <label className="absolute bottom-0 right-0">
        <input
          ref={inputFileRef}
          type="file"
          onChange={(e) =>
            toast.promise(
              handleFileChange({ event: e, setFile, inputFileRef }),
              {
                pending: "Processando...",
              }
            )
          }
          accept="image/*"
          className="hidden"
        />
        <div className="bg-background rounded-full p-[7px] border border-black">
          <CameraIcon className="w-[20px] h-[20px]" />
        </div>
      </label>

      {file && (
        <div className="w-full h-full flex justify-center items-center left-0 top-0 fixed z-20">
          <div
            onClick={() => {
              setFile(null);
              clearFileInput(inputFileRef);
            }}
            className="bg-black/80 w-full h-full left-0 top-0 fixed"
          />
          <div className="flex flex-col w-full">
            <button
              onClick={() =>
                toast.promise(
                  SaveImageProfile({
                    cropperRef,
                    file,
                    user: user!,
                    setUser,
                    setIsLoading,
                    closeDialog,
                  }),
                  {
                    pending: "Salvando...",
                  }
                )
              }
              disabled={isLoading}
              className="z-50 ml-auto bg-primary px-[10px] py-[2px] mr-[5px] rounded-[4px] font-[500] text-[#212121]"
            >
              {isLoading ? (
                <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
              ) : (
                "Confirmar"
              )}
            </button>
            <Cropper
              src={URL.createObjectURL(file)}
              className="aspect-square w-full mt-[10px] self-center mx-auto"
              aspectRatio={1 / 1}
              ref={cropperRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default EditImageProfile;
