'use client';

import { read } from "fs";
import { Upload } from "lucide-react";
import { useState, useRef, FormEvent } from "react";

export function CreateGameForm() {

    const [uploadedImage, setUploadedImage] = useState<string>()
    const imageInput = useRef<HTMLInputElement>(null)

    const setImage = (event: FormEvent<HTMLInputElement>) => {
        if (!imageInput.current || !imageInput.current?.files) return;
        console.log("Setting new image...")

        const image = imageInput.current.files[0];

        const reader = new FileReader();

        reader.readAsDataURL(image);

        reader.onload = (e) => {

            const isString = typeof reader.result == 'string';
            if (!isString) return;

            setUploadedImage(reader.result);

        }

    }

    return (
        <div className="bg-main-800 w-full p-10 min-h-200 rounded-2xl">
            <form method="POST" action={'/api/dev/games/create'} encType="multipart/form-data">

                <div className="flex flex-row  justify-between items-stretch">
                    <div className="flex flex-col gap-2 grow min-w-50  pr-10">
                        <div>
                            <p className="text-lg text-main-200">Game Details</p>
                            <p className="text-main-400">Details like title, description etc.</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Game Name <strong className="text-purple-500">*</strong></label>
                            <input type="text" className="w-full  bg-black h-10 p-2 rounded-lg placeholder-main-500" required placeholder="E.g Snow Riders 3D" name="name" />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label>Slug <strong className="text-purple-500">*</strong></label>
                            <input type="text" className="w-full  bg-black h-10 p-2 rounded-lg placeholder-main-500" required placeholder="E.g snowriders3d" name="id" />
                        </div>


                        <div className="flex flex-col gap-2">
                            <label>Short Description <strong className="text-purple-500">*</strong></label>
                            <input type="text" className="w-full  bg-black h-10 p-2 rounded-lg placeholder-main-500" required placeholder="E.g Snow Riders 3D is an endless runner where you sled down a snow hill!" name="shortDescription" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <label>Categories <strong className="text-purple-500">*</strong></label>
                                <p className="text-main-500">Choose at least one category, seperate by commas.</p>
                            </div>
                            <input type="text" className="w-full bg-black h-10 p-2 rounded-lg placeholder-main-500" required placeholder="E.g endless,fun,action" name="categories" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <label>Game <strong className="text-purple-500">*</strong></label>
                                <p className="text-main-500">Upload your game folder. Must have an <code className="bg-black p-1.25">index.html</code> file.</p>
                            </div>
                            <input type="file" accept=".zip" className="w-full bg-black h-10 p-2 rounded-lg placeholder-main-500" required name="gameFolder" />
                        </div>


                        <p><strong className="text-purple-500">*</strong> indicates that an input is required.</p>

                        <button className="w-50 h-10 bg-black rounded-lg hover:cursor-pointer  hover:bg-main-700 transition-all">Create Game</button>

                    </div>
                    <div className="w-50 h-50 aspect-square flex items-center justify-center relative overflow-clip bg-main-900 rounded-2xl hover:cursor-pointer"
                        onClick={() => imageInput.current?.click()}
                    >
                        {
                            uploadedImage ? <img className="max-w-full max-h-full" width={250} height={250} src={uploadedImage}></img>
                                :
                                <Upload className="w-3/16 h-3/16 stroke-main-600" />
                        }

                        <input type="file" accept="image/webp" className="text-transparent absolute bottom-0" ref={imageInput} onInput={setImage} name="image" required />

                    </div>
                </div>
            </form>
        </div>
    )
}