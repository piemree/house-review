export default function Loading() {
    return (
        <>
            <div className="flex justify-center items-center  fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-10">
                <div className="rounded-full h-20 w-20 bg-red-600 animate-ping"></div>
            </div>
        </>
    )
}
