import { Skeleton } from "@/components/ui/skeleton"

export const ProductSkeleton = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] rounded-xl bg-slate-200" />
            <div className="space-y-2">
                <Skeleton className="h-4 bg-slate-200" />
                <Skeleton className="h-4 w-1/2 bg-slate-200" />
            </div>
        </div>
    )
}
