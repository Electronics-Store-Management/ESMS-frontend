import StaffTouch from "./StaffTouch";

export default interface BaseEntity {
    id: string;
    createdDate: Date;
    modifiedDate: Date;
    createdBy: StaffTouch;
    modifiedBy: StaffTouch;
}
