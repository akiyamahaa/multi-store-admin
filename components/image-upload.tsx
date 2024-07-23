"use client";

import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { ImagePlus } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PuffLoader } from "react-spinners";
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload({
  onChange,
  onRemove,
  value,
  disabled,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = async (e: any) => {
    const file = e.target.file[0];
    setIsLoading(true);

    const uploadTask = uploadBytesResumable(
      ref(storage, `Image/${Date.now()}-${file.name}`),
      file,
      { contentType: file.type }
    );
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
          onChange(downloadUrl);
          setIsLoading(false);
        });
      }
    );
  };

  return (
    <div>
      {value && value.length > 0 ? (
        <></>
      ) : (
        <div className="w-52 h-52 rounded-md overflow-hidden border-dashed border-gray-200 flex items-center justify-center flex-col gap-3">
          {isLoading ? (
            <>
              <PuffLoader size={30} color="#555" />
              <p>{`${progress.toFixed(2)}%`}</p>
            </>
          ) : (
            <>
              <label>
                <div className="w-full h-full flex flex-col gap-2 items-center justify-center cursor-pointer">
                  <ImagePlus className="h-4 w-4" />
                  <p>Upload an image</p>
                </div>
                <input type="file" accept="image/*" className="h-0 w-0" />
              </label>
            </>
          )}
        </div>
      )}
    </div>
  );
}
