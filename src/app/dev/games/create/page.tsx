import { CreateGameForm } from "@/lib/components/dev/forms";

export default function Page() {
    return (
        <div className="min-h-screen p-10 flex flex-col gap-10">

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl">Create a game</h1>
                <p>Upload and Create a game with specified details.</p>
            </div>
            <CreateGameForm />

        </div>
    )
}