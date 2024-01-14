export function isDetailPage(path: string, position = 2) {
    const detailSection = path.split("?").at(1)?.split("/").at(position);
    return !!detailSection;
}
