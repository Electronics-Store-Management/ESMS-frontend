import checkPermission from "@/utils/permissionCheck";

export default function Page() {
    checkPermission("STAFF");

    return null;
}
