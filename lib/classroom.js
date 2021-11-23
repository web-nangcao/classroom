const listClass = [
    { className: "Web nâng cao", topic: "Lập trình", host: "Khánh Nguyễn Huy" },
    { className: "Web cơ bản", topic: "Lập trình", host: "Dương Bội Long" },
    { className: "Web api", topic: "Lập trình", host: "Võ Thế Minh" },
    {
        className: "Web front end",
        topic: "Lập trình",
        host: "Phạm Tống Bình Minh",
    },
    { className: "Vip Pro Siêu Cấp", topic: "Lập trình", host: "Lalala" },
];
export default listClass;

let classromLib = {
    getAllClass: function() {
        return listClass;
    },
    getClassDetail: function(classID) {
        return listClass[classID];
    },
};