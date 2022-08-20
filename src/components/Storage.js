class Storage {
    static saveData(data) {
        localStorage.setItem("priceLists", JSON.stringify(data))
    };
    static getData() {
        const projectList = JSON.parse(localStorage.getItem("priceLists"));
        if(projectList === null) {
            return [];
        } else {
            return projectList;
        }
    };
    static checkLength() {
        let currentList = JSON.parse(localStorage.getItem("priceLists"))
        if (currentList.length > 15) {
            localStorage.setItem("projectList", JSON.stringify(currentList.slice(0,15)));
        };
    };
};

export default Storage;