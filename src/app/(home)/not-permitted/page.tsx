export default function Page() {
    return (
        <div className=" w-full h-full flex flex-col items-center">
            <p className=" mt-28 font-semibold text-secondary-950 text-lg">
                Not permitted
            </p>
            <p className=" mt-4 mx-20 text-center font-medium text-secondary-600">
                You are not allowed to access this page, please contact your
                admin to request the permission
            </p>
        </div>
    );
}
