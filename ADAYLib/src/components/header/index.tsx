import { Button } from "@/components/ui/button"

export function Header() {
    return (
        <div className="flex flex-row justify-evenly  m-auto pt-2 pb-2 bg-slate-700">
            <h1>Header</h1>
            <Button>Click</Button>
            <Button variant="destructive" className="w-24 h-10 ml-2">Click</Button>
        </div>
        
    )
}
