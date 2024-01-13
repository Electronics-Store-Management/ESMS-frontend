export default interface Revision<T> {
    id: string;
    timestamp: number;
    username: string;
    revision: T;
}
