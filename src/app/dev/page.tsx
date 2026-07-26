import { CreateGameForm } from "@/lib/components/dev/forms";

export default function DevPanel() {
    return (
        <div className="p-10 flex flex-col gap-7">
            <div>
                <h1 className="text-3xl">Dev Panel</h1>
                <p className="text-main-500">Create, edit, manage games in site</p>
            </div>
            <div className="w-full min-h-screen grid not-md:grid-cols-1 grid-cols-2">
                <div className="w-full bg-main-800 h-full rounded-2xl">
                    <CreateGameForm />
                </div>
            </div>
        </div>
    )
}