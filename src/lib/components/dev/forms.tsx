'use client';

import { Upload } from "lucide-react";
import { ChangeEvent, FormEvent, useRef, useState } from "react";

type FormStatus = {
    type: 'idle' | 'success' | 'error';
    message: string;
};

export function CreateGameForm() {
    const [uploadedImage, setUploadedImage] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<FormStatus>({ type: 'idle', message: '' });
    const [formValues, setFormValues] = useState({
        name: '',
        id: '',
        shortDescription: '',
        categories: '',
        specialCategories: '',
    });
    const imageInput = useRef<HTMLInputElement>(null);

    const setImage = (event: FormEvent<HTMLInputElement>) => {
        if (!imageInput.current || !imageInput.current?.files) return;

        const image = imageInput.current.files[0];
        if (!image) return;

        const reader = new FileReader();
        reader.readAsDataURL(image);

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setUploadedImage(reader.result);
            }
        };
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: 'idle', message: '' });

        const formData = new FormData(event.currentTarget);

        try {
            const response = await fetch('/api/dev/games/create', {
                method: 'POST',
                body: formData,
            });

            const responseText = await response.text();
            let payload: { error?: string; id?: string } | null = null;

            try {
                payload = responseText ? JSON.parse(responseText) : null;
            } catch {
                payload = null;
            }

            if (!response.ok) {
                const message = payload?.error
                    ? `${payload.error} (HTTP ${response.status})`
                    : `Request failed with status ${response.status}`;
                setStatus({ type: 'error', message });
                return;
            }

            setStatus({
                type: 'success',
                message: payload?.id ? `Created game ${payload.id}.` : 'Game created successfully.',
            });
        } catch (error) {
            setStatus({
                type: 'error',
                message: `Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-main-800 w-full p-10 min-h-200 rounded-2xl">
            <h1 className="text-2xl pb-5">Create Game</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="flex flex-row justify-between items-stretch">
                    <div className="flex flex-col gap-2 grow min-w-50 pr-10">
                        <div>
                            <p className="text-lg text-main-200">Game Details</p>
                            <p className="text-main-400">Details like title, description etc.</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Game Name <strong className="text-purple-500">*</strong></label>
                            <input
                                type="text"
                                className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500"
                                required
                                placeholder="E.g Snow Riders 3D"
                                name="name"
                                value={formValues.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Slug <strong className="text-purple-500">*</strong></label>
                            <input
                                type="text"
                                className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500"
                                required
                                placeholder="E.g snowriders3d"
                                name="id"
                                value={formValues.id}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>Short Description <strong className="text-purple-500">*</strong></label>
                            <input
                                type="text"
                                className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500"
                                required
                                placeholder="E.g Snow Riders 3D is an endless runner where you sled down a snow hill!"
                                name="shortDescription"
                                value={formValues.shortDescription}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <label>Categories <strong className="text-purple-500">*</strong></label>
                                <p className="text-main-500">Choose at least one category, separate by commas.</p>
                            </div>
                            <input
                                type="text"
                                className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500"
                                required
                                placeholder="E.g endless,fun,action"
                                name="categories"
                                value={formValues.categories}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <label>Exclusive Tags</label>
                                <p className="text-main-500">Exclusive tags, not required, but can be used to display at top of main page.</p>
                            </div>
                            <input
                                type="text"
                                className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500"
                                placeholder="E.g new"
                                name="specialCategories"
                                value={formValues.specialCategories}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div>
                                <label>Game <strong className="text-purple-500">*</strong></label>
                                <p className="text-main-500">Upload your game folder. Must have an <code className="bg-main-900 p-1.25">index.html</code> file.</p>
                            </div>
                            <input type="file" accept=".zip" className="w-full bg-main-900 h-10 p-2 rounded-lg placeholder-main-500" required name="gameFolder" />
                        </div>

                        <p><strong className="text-purple-500">*</strong> indicates that an input is required.</p>

                        {status.message ? (
                            <div className={`rounded-lg p-3 text-sm ${status.type === 'error' ? 'bg-red-950/50 text-red-300' : 'bg-emerald-950/50 text-emerald-300'}`}>
                                {status.message}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-50 h-10 bg-main-900 rounded-lg hover:cursor-pointer hover:bg-main-700 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Game'}
                        </button>
                    </div>

                    <div
                        className="w-50 h-50 aspect-square flex items-center justify-center relative overflow-clip bg-main-900 rounded-2xl hover:cursor-pointer"
                        onClick={() => imageInput.current?.click()}
                    >
                        {uploadedImage ? (
                            <img className="max-w-full max-h-full" width={250} height={250} src={uploadedImage} alt="Uploaded preview" />
                        ) : (
                            <Upload className="w-3/16 h-3/16 stroke-main-600" />
                        )}

                        <input
                            type="file"
                            accept="image/webp"
                            className="text-transparent absolute bottom-0"
                            ref={imageInput}
                            onInput={setImage}
                            name="image"
                            required
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}