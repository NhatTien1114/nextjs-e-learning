enum EUserStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    BANNED = "Banned",
}

enum EUserRole {
    ADMIN = "Admin",
    USER = "User",
}

enum ECourseStatus {
    APPROVED = "Approved",
    PENDING = "Pending",
    REJECT = "Reject"
}

enum ECourseLevel {
    BEGINNER = "Beginner",
    INTERMEDIATE = "Intermediate",
    ADVANCED = "Advanced",
}

enum ELessonType {
    VIDEO = "Video",
    QUIZ = "Quiz",
    TEXT = "Text",
}

enum EOrderStatus {
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECT = "Reject"
}

export {
    EUserRole,
    EUserStatus,
    ECourseLevel,
    ECourseStatus,
    ELessonType,
    EOrderStatus
}